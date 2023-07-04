const encrypt = require("./crypt").encrypt
const fetch = require("node-fetch")

function au(aZ, b0) {
    aZ = [aZ[0x0] >>> 0x10, aZ[0x0] & 0xffff, aZ[0x1] >>> 0x10, aZ[0x1] & 0xffff], b0 = [b0[0x0] >>> 0x10, b0[0x0] & 0xffff, b0[0x1] >>> 0x10, b0[0x1] & 0xffff];
    var b1 = [0x0, 0x0, 0x0, 0x0];
    return b1[0x3] += aZ[0x3] + b0[0x3], b1[0x2] += b1[0x3] >>> 0x10, b1[0x3] &= 0xffff, b1[0x2] += aZ[0x2] + b0[0x2], b1[0x1] += b1[0x2] >>> 0x10, b1[0x2] &= 0xffff, b1[0x1] += aZ[0x1] + b0[0x1], b1[0x0] += b1[0x1] >>> 0x10, b1[0x1] &= 0xffff, b1[0x0] += aZ[0x0] + b0[0x0], b1[0x0] &= 0xffff, [b1[0x0] << 0x10 | b1[0x1], b1[0x2] << 0x10 | b1[0x3]];
  }
  function av(aZ, b0) {
    aZ = [aZ[0x0] >>> 0x10, aZ[0x0] & 0xffff, aZ[0x1] >>> 0x10, aZ[0x1] & 0xffff], b0 = [b0[0x0] >>> 0x10, b0[0x0] & 0xffff, b0[0x1] >>> 0x10, b0[0x1] & 0xffff];
    var b1 = [0x0, 0x0, 0x0, 0x0];
    return b1[0x3] += aZ[0x3] * b0[0x3], b1[0x2] += b1[0x3] >>> 0x10, b1[0x3] &= 0xffff, b1[0x2] += aZ[0x2] * b0[0x3], b1[0x1] += b1[0x2] >>> 0x10, b1[0x2] &= 0xffff, b1[0x2] += aZ[0x3] * b0[0x2], b1[0x1] += b1[0x2] >>> 0x10, b1[0x2] &= 0xffff, b1[0x1] += aZ[0x1] * b0[0x3], b1[0x0] += b1[0x1] >>> 0x10, b1[0x1] &= 0xffff, b1[0x1] += aZ[0x2] * b0[0x2], b1[0x0] += b1[0x1] >>> 0x10, b1[0x1] &= 0xffff, b1[0x1] += aZ[0x3] * b0[0x1], b1[0x0] += b1[0x1] >>> 0x10, b1[0x1] &= 0xffff, b1[0x0] += aZ[0x0] * b0[0x3] + aZ[0x1] * b0[0x2] + aZ[0x2] * b0[0x1] + aZ[0x3] * b0[0x0], b1[0x0] &= 0xffff, [b1[0x0] << 0x10 | b1[0x1], b1[0x2] << 0x10 | b1[0x3]];
  }
  function aw(aZ, b0) {
    b0 %= 0x40;
    if (b0 === 0x20) return [aZ[0x1], aZ[0x0]];else return b0 < 0x20 ? [aZ[0x0] << b0 | aZ[0x1] >>> 0x20 - b0, aZ[0x1] << b0 | aZ[0x0] >>> 0x20 - b0] : (b0 -= 0x20, [aZ[0x1] << b0 | aZ[0x0] >>> 0x20 - b0, aZ[0x0] << b0 | aZ[0x1] >>> 0x20 - b0]);
  }
  function ax(aZ, b0) {
    b0 %= 0x40;
    if (b0 === 0x0) return aZ;else return b0 < 0x20 ? [aZ[0x0] << b0 | aZ[0x1] >>> 0x20 - b0, aZ[0x1] << b0] : [aZ[0x1] << b0 - 0x20, 0x0];
  }
  function ay(aZ, b0) {
    return [aZ[0x0] ^ b0[0x0], aZ[0x1] ^ b0[0x1]];
  }
  function az(aZ) {
    return aZ = ay(aZ, [0x0, aZ[0x0] >>> 0x1]), aZ = av(aZ, [0xff51afd7, 0xed558ccd]), aZ = ay(aZ, [0x0, aZ[0x0] >>> 0x1]), aZ = av(aZ, [0xc4ceb9fe, 0x1a85ec53]), aZ = ay(aZ, [0x0, aZ[0x0] >>> 0x1]), aZ;
  }

function makeHash(aZ, b0) {
    aZ = aZ || '', b0 = b0 || 0x0;
    var b1 = aZ["length"] % 0x10,
        b2 = aZ["length"] - b1,
        b3 = [0x0, b0],
        b4 = [0x0, b0],
        b5 = [0x0, 0x0],
        b6 = [0x0, 0x0],
        b7 = [0x87c37b91, 0x114253d5],
        b8 = [0x4cf5ad43, 0x2745937f];
    for (var b9 = 0x0; b9 < b2; b9 = b9 + 0x10) {
        b5 = [aZ["charCodeAt"](b9 + 0x4) & 0xff | (aZ['charCodeAt'](b9 + 0x5) & 0xff) << 0x8 | (aZ["charCodeAt"](b9 + 0x6) & 0xff) << 0x10 | (aZ['charCodeAt'](b9 + 0x7) & 0xff) << 0x18, aZ["charCodeAt"](b9) & 0xff | (aZ["charCodeAt"](b9 + 0x1) & 0xff) << 0x8 | (aZ["charCodeAt"](b9 + 0x2) & 0xff) << 0x10 | (aZ["charCodeAt"](b9 + 0x3) & 0xff) << 0x18], b6 = [aZ['charCodeAt'](b9 + 0xc) & 0xff | (aZ["charCodeAt"](b9 + 0xd) & 0xff) << 0x8 | (aZ["charCodeAt"](b9 + 0xe) & 0xff) << 0x10 | (aZ["charCodeAt"](b9 + 0xf) & 0xff) << 0x18, aZ["charCodeAt"](b9 + 0x8) & 0xff | (aZ["charCodeAt"](b9 + 0x9) & 0xff) << 0x8 | (aZ['charCodeAt'](b9 + 0xa) & 0xff) << 0x10 | (aZ["charCodeAt"](b9 + 0xb) & 0xff) << 0x18], b5 = av(b5, b7), b5 = aw(b5, 0x1f), b5 = av(b5, b8), b3 = ay(b3, b5), b3 = aw(b3, 0x1b), b3 = au(b3, b4), b3 = au(av(b3, [0x0, 0x5]), [0x0, 0x52dce729]), b6 = av(b6, b8), b6 = aw(b6, 0x21), b6 = av(b6, b7), b4 = ay(b4, b6), b4 = aw(b4, 0x1f), b4 = au(b4, b3), b4 = au(av(b4, [0x0, 0x5]), [0x0, 0x38495ab5]);
    }
    b5 = [0x0, 0x0], b6 = [0x0, 0x0];
    switch (b1) {
        case 0xf:
            b6 = ay(b6, ax([0x0, aZ['charCodeAt'](b9 + 0xe)], 0x30));
        case 0xe:
            b6 = ay(b6, ax([0x0, aZ['charCodeAt'](b9 + 0xd)], 0x28));
        case 0xd:
            b6 = ay(b6, ax([0x0, aZ["charCodeAt"](b9 + 0xc)], 0x20));
        case 0xc:
            b6 = ay(b6, ax([0x0, aZ["charCodeAt"](b9 + 0xb)], 0x18));
        case 0xb:
            b6 = ay(b6, ax([0x0, aZ["charCodeAt"](b9 + 0xa)], 0x10));
        case 0xa:
            b6 = ay(b6, ax([0x0, aZ["charCodeAt"](b9 + 0x9)], 0x8));
        case 0x9:
            b6 = ay(b6, [0x0, aZ["charCodeAt"](b9 + 0x8)]), b6 = av(b6, b8), b6 = aw(b6, 0x21), b6 = av(b6, b7), b4 = ay(b4, b6);
        case 0x8:
            b5 = ay(b5, ax([0x0, aZ["charCodeAt"](b9 + 0x7)], 0x38));
        case 0x7:
            b5 = ay(b5, ax([0x0, aZ["charCodeAt"](b9 + 0x6)], 0x30));
        case 0x6:
            b5 = ay(b5, ax([0x0, aZ["charCodeAt"](b9 + 0x5)], 0x28));
        case 0x5:
            b5 = ay(b5, ax([0x0, aZ["charCodeAt"](b9 + 0x4)], 0x20));
        case 0x4:
            b5 = ay(b5, ax([0x0, aZ["charCodeAt"](b9 + 0x3)], 0x18));
        case 0x3:
            b5 = ay(b5, ax([0x0, aZ["charCodeAt"](b9 + 0x2)], 0x10));
        case 0x2:
            b5 = ay(b5, ax([0x0, aZ["charCodeAt"](b9 + 0x1)], 0x8));
        case 0x1:
            b5 = ay(b5, [0x0, aZ['charCodeAt'](b9)]), b5 = av(b5, b7), b5 = aw(b5, 0x1f), b5 = av(b5, b8), b3 = ay(b3, b5);
    }
    return b3 = ay(b3, [0x0, aZ["length"]]), b4 = ay(b4, [0x0, aZ['length']]), b3 = au(b3, b4), b4 = au(b4, b3), b3 = az(b3), b4 = az(b4), b3 = au(b3, b4), b4 = au(b4, b3), ("00000000" + (b3[0x0] >>> 0x0)['toString'](0x10))["slice"](-0x8) + ("00000000" + (b3[0x1] >>> 0x0)['toString'](0x10))["slice"](-0x8) + ("00000000" + (b4[0x0] >>> 0x0)["toString"](0x10))['slice'](-0x8) + ("00000000" + (b4[0x1] >>> 0x0)["toString"](0x10))['slice'](-0x8);
}

function generateNewBDA() {
    let n_value = btoa(Math.round(Date.now() / 0x3e8).toString())
    let webgl_extensions = "ANGLE_instanced_arrays;EXT_blend_minmax;EXT_color_buffer_half_float;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw"
    return [
        {
            "key": "api_type",
            "value": "js"
        },
        {
            "key": "p",
            "value": 1
        },
        {
            "key": "f",
            "value": "d0ca7aa5457c50611a693ba4722956fb"
        },
        {
            "key": "n",
            "value": n_value
        },
        {
            "key": "wh",
            "value": "f107afb65fd17ca649198dc8cf1b8dda|72627afbfd19a741c7da1732218301ac"
        },
        {
            "key": "enhanced_fp",
            "value": [
                {
                    "key": "webgl_extensions",
                    "value": webgl_extensions
                },
                {
                    "key": "webgl_extensions_hash",
                    "value": makeHash(webgl_extensions)
                },
                {
                    "key": "webgl_renderer",
                    "value": "WebKit WebGL"
                },
                {
                    "key": "webgl_vendor",
                    "value": "WebKit"
                },
                {
                    "key": "webgl_version",
                    "value": "WebGL 1.0 (OpenGL ES 2.0 Chromium)"
                },
                {
                    "key": "webgl_shading_language_version",
                    "value": "WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)"
                },
                {
                    "key": "webgl_aliased_line_width_range",
                    "value": "[1, 10]"
                },
                {
                    "key": "webgl_aliased_point_size_range",
                    "value": "[1, 2047]"
                },
                {
                    "key": "webgl_antialiasing",
                    "value": "yes"
                },
                {
                    "key": "webgl_bits",
                    "value": "8,8,24,8,8,0"
                },
                {
                    "key": "webgl_max_params",
                    "value": "16,64,32768,1024,32768,32,32768,31,16,32,1024"
                },
                {
                    "key": "webgl_max_viewport_dims",
                    "value": "[32768, 32768]"
                },
                {
                    "key": "webgl_unmasked_vendor",
                    "value": ""
                },
                {
                    "key": "webgl_unmasked_renderer",
                    "value": ""
                },
                {
                    "key": "webgl_vsf_params",
                    "value": "23,127,127,10,15,15,10,15,15"
                },
                {
                    "key": "webgl_vsi_params",
                    "value": "0,31,30,0,31,30,0,31,30"
                },
                {
                    "key": "webgl_fsf_params",
                    "value": "23,127,127,10,15,15,10,15,15"
                },
                {
                    "key": "webgl_fsi_params",
                    "value": "0,31,30,0,31,30,0,31,30"
                },
                {
                    "key": "webgl_hash_webgl",
                    "value": "3c776bb5ea8479524eb7453e821c15bd"
                },
                {
                    "key": "user_agent_data_brands",
                    "value": "Chromium,Not(A:Brand"
                },
                {
                    "key": "user_agent_data_mobile",
                    "value": false
                },
                {
                    "key": "navigator_connection_downlink",
                    "value": 1.35
                },
                {
                    "key": "navigator_connection_downlink_max",
                    "value": null
                },
                {
                    "key": "network_info_rtt",
                    "value": 100
                },
                {
                    "key": "network_info_save_data",
                    "value": false
                },
                {
                    "key": "network_info_rtt_type",
                    "value": null
                },
                {
                    "key": "screen_pixel_depth",
                    "value": 24
                },
                {
                    "key": "navigator_device_memory",
                    "value": 8
                },
                {
                    "key": "navigator_languages",
                    "value": "en-US,en"
                },
                {
                    "key": "window_inner_width",
                    "value": 0
                },
                {
                    "key": "window_inner_height",
                    "value": 0
                },
                {
                    "key": "window_outer_width",
                    "value": 2560
                },
                {
                    "key": "window_outer_height",
                    "value": 1386
                },
                {
                    "key": "browser_detection_firefox",
                    "value": false
                },
                {
                    "key": "browser_detection_brave",
                    "value": false
                },
                {
                    "key": "audio_codecs",
                    "value": "{\"ogg\":\"probably\",\"mp3\":\"probably\",\"wav\":\"probably\",\"m4a\":\"maybe\",\"aac\":\"probably\"}"
                },
                {
                    "key": "video_codecs",
                    "value": "{\"ogg\":\"probably\",\"h264\":\"probably\",\"webm\":\"probably\",\"mpeg4v\":\"\",\"mpeg4a\":\"\",\"theora\":\"\"}"
                },
                {
                    "key": "media_query_dark_mode",
                    "value": false
                },
                {
                    "key": "headless_browser_phantom",
                    "value": false
                },
                {
                    "key": "headless_browser_selenium",
                    "value": false
                },
                {
                    "key": "headless_browser_nightmare_js",
                    "value": false
                },
                {
                    "key": "document__referrer",
                    "value": "https://iframe.arkoselabs.com/"
                },
                {
                    "key": "window__ancestor_origins",
                    "value": [
                        "https://iframe.arkoselabs.com"
                    ]
                },
                {
                    "key": "window__tree_index",
                    "value": [
                        0
                    ]
                },
                {
                    "key": "window__tree_structure",
                    "value": "[[]]"
                },
                {
                    "key": "window__location_href",
                    "value": "https://client-api.arkoselabs.com/v2/1.5.2/enforcement.64b3a4e29686f93d52816249ecbf9857.html#2CB16598-CB82-4CF7-B332-5990DB66F3AB"
                },
                {
                    "key": "client_config__sitedata_location_href",
                    "value": "https://iframe.arkoselabs.com/2CB16598-CB82-4CF7-B332-5990DB66F3AB/index.html"
                },
                {
                    "key": "client_config__surl",
                    "value": "https://client-api.arkoselabs.com"
                },
                {
                    "key": "mobile_sdk__is_sdk"
                },
                {
                    "key": "client_config__language",
                    "value": null
                },
                {
                    "key": "navigator_battery_charging",
                    "value": true
                },
                {
                    "key": "audio_fingerprint",
                    "value": "124.04347527516074"
                }
            ]
        },
        {
            "key": "fe",
            "value": [
                "DNT:unknown",
                "L:en-US",
                "D:24",
                "PR:1",
                "S:2560,1440",
                "AS:2560,1386",
                "TO:-120",
                "SS:true",
                "LS:true",
                "IDB:true",
                "B:false",
                "ODB:true",
                "CPUC:unknown",
                "PK:Linux x86_64",
                "CFP:-1968300860",
                "FR:false",
                "FOS:false",
                "FB:false",
                "JSF:",
                "P:Chrome PDF Viewer,Chromium PDF Viewer,Microsoft Edge PDF Viewer,PDF Viewer,WebKit built-in PDF",
                "T:0,false,false",
                "H:12",
                "SWF:false"
            ]
        },
        {
            "key": "ife_hash",
            "value": "e0b60cb256efe65add72f6e3ba491bca"
        },
        {
            "key": "cs",
            "value": 1
        },
        {
            "key": "jsbd",
            "value": "{\"HL\":2,\"NCE\":true,\"DT\":\"\",\"NWD\":\"false\",\"DOTO\":1,\"DMTO\":1}"
        }
    ]
}


const constantValue = 0x5460;
const userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
const timeFrame = new Date().getTime() / 0x3e8;
const timeFrameKey = Math.floor(timeFrame - timeFrame % constantValue);
const encryptionKey = userAgent + timeFrameKey;
const toEncrypt = JSON.stringify(generateNewBDA())
const encryptedBDA = btoa(encrypt(toEncrypt, encryptionKey))

let req = fetch('https://client-api.arkoselabs.com/fc/gt2/public_key/2CB16598-CB82-4CF7-B332-5990DB66F3AB', {
  method: 'POST',
  headers: {
    'authority': 'client-api.arkoselabs.com',
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'origin': 'https://client-api.arkoselabs.com',
    'pragma': 'no-cache',
    'referer': 'https://client-api.arkoselabs.com/v2/1.5.2/enforcement.64b3a4e29686f93d52816249ecbf9857.html',
    'sec-ch-ua': '"Chromium";v="111", "Not(A:Brand";v="8"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Linux"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
  },
  body: 'bda=' + encryptedBDA + '&public_key=2CB16598-CB82-4CF7-B332-5990DB66F3AB&site=https%3A%2F%2Fiframe.arkoselabs.com&userbrowser=Mozilla%2F5.0%20(X11%3B%20Linux%20x86_64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F111.0.0.0%20Safari%2F537.36&capi_version=1.5.2&capi_mode=inline&style_theme=default&rnd=' + Math.random() + '&data[blob]=undefined'
});

req.then(resp=>{
    console.log(resp.status)
    resp.json().then(text=>{
        console.log(text['token'])
    })
})