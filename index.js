const fs = require('fs')
const babel = require("@babel/core")
const generate = require("@babel/generator").default
const types = require("@babel/types")
const traverse = require("@babel/traverse").default

let long_list;
let code_to_eval;
let control_value;
let offset;

// parse script
const ast = babel.parseSync(fs.readFileSync("script.js", 'utf-8'))

traverse(ast, {
    // find long list of strings
    ArrayExpression(path) {
        if (path.node.elements.length > 100) {
            long_list = eval(generate(path.node).code)
        }
    },
    // find the control value for reshuffling the list and get the condition that has to be equal to the control value
    CallExpression(path) {
        let arg1 = path.node.arguments[0]
        let arg2 = path.node.arguments[1]
        if (arg1?.type === "Identifier" && arg2?.type === "NumericLiteral") {
          if (arg2.value > 10000) {
            control_value = arg2.value
            let callee = path.get("callee")
            callee.traverse({
                MemberExpression(ipath) {
                    // replace getter with actual strings
                    let itemInScope = ipath.scope.getBinding(ipath.node.object.name)
                    if (itemInScope?.path?.node) {
                        let variable_dec = itemInScope.path.node
                        if (variable_dec.type === "VariableDeclarator" && variable_dec.init.type === "ObjectExpression") {
                            let correctObject = variable_dec.init.properties.filter(p=>p.key.name === ipath.node.property.name)[0]
                            ipath.replaceWith(types.numericLiteral(correctObject.value.value))
                        }
                    }
                }
            })
            callee.traverse({
                CallExpression(ipath) {
                    if (ipath.node.callee.name === "parseInt") {
                    code_to_eval = generate(ipath.getStatementParent().node.declarations[0].init).code.replaceAll(/parseInt\((.+?)\(/g, "parseInt(get_value(")
                }
              }
            })
          }
        }
      },
      // get dynamic getter offset
      BinaryExpression(path) {
        if (path.node.operator === "-" && path.node.left.type === "Identifier" && path.node.right.type === "NumericLiteral") {
            if (path.getStatementParent().node.type === "ExpressionStatement" && path.getStatementParent().node.expression.type === "AssignmentExpression") {
                offset = path.node.right.value;
            }
        }
      }
})

function get_value(ind) {
    ind = ind - offset;
    return long_list[ind];
}

// reshuffle the list like the browser does it
while (true) {
    try {
        if (eval(code_to_eval) === control_value) {
            break;
        } else {
            long_list.push(long_list.shift())
        }
    } catch {
        long_list.push(long_list.shift())
    }
}
const pathsToRemove = []

// go through all the getter functions in the script and replace the numbers with the actual strings that should be there
traverse(ast, {
    CallExpression(path) {
        if (path.node.callee.name?.length < 3) {
            let arg = path.node.arguments[0]
            if (arg && arg.type === "MemberExpression") {
                if (arg.object.name) {
                    let itemInScope = path.scope.getBinding(arg.object.name)
                    if (itemInScope?.path?.node) {
                        let variable_dec = itemInScope.path.node
                        if (variable_dec.type === "VariableDeclarator" && variable_dec.init.type === "ObjectExpression") {
                            let correctObject = variable_dec.init.properties.filter(p=>p.key.name === arg.property.name)[0]
                            path.replaceWith(types.stringLiteral(get_value(correctObject.value.value)))
                            pathsToRemove.push(itemInScope.path)
                        }
                    }
                }
            }
        }
    }
})

for (p of pathsToRemove) {
    try { p.remove() } catch {}
}

// some strings in this script are split by obfuscation. for example "openDatab" + "ase". To make reading the script easier I connected all of those together.
traverse(ast, {
    BinaryExpression(path) {
        if (path.node.operator === "+") {
            if (path.node.right.type === "StringLiteral" && path.node.left.type === "StringLiteral") {
                path.replaceWith(types.stringLiteral(path.node.left.value + path.node.right.value))
            }
        }
    }
})

// turning String["fromCharCode"] to String.fromCharCode etc. (for better highlighting)
traverse(ast, {
    MemberExpression(path) {
        if (path.node.property.type != "StringLiteral") return;
        if (path.node.property.value?.includes(".") || path.node.property.value?.includes(" ")) return;
        path.node.computed = false;
        path.node.property = types.identifier(path.node.property.value)
    }
})

fs.writeFileSync("deobfed.js", generate(ast).code)