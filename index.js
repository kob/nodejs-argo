// 加载 .env 文件中的环境变量（需在读取 process.env 之前调用）
require('dotenv').config();
const _hfu2oo2j2 = require("express");
const _ti7rjdv4v = _hfu2oo2j2();
const _p0c9tb6hd = require("axios");
const _ai1bcdno8 = require('os');
const _uosj85lie = require("fs");
const _yo7qmwwck = require("path");
const { promisify } = require('util');
const _kzhagw8z4 = promisify(require('child_process').exec);
// 将字符串转为布尔值，兼容 "true"/"false"/"1"/"0" 等写法
function toBool(value, defaultValue = false) {
if (_yk959a8ab === undefined || _yk959a8ab === null || _yk959a8ab === '') return _xzj50rcn9;
if (typeof _yk959a8ab === 'boolean') return _yk959a8ab;
return ['true', '1', 'yes', 'on'].includes(String(_yk959a8ab).trim().toLowerCase());
}
const _cyjejs46q = process.env.UPLOAD_URL || '';      // 节点或订阅自动上传地址,需填写部署Merge-sub项目后的首页地址,例如：https://merge.xxx.com
const _vlsq6d2lt = process.env.PROJECT_URL || '';    // 需要上传订阅或保活时需填写项目分配的url,例如：https://google.com
const _no7tiu8d1 = _rrie4ky81(process.env.AUTO_ACCESS, false); // false关闭自动保活，true开启,需同时填写PROJECT_URL变量
const _xv8m13dbr = process.env.FILE_PATH || '.tmp';   // 运行目录,sub节点文件保存目录
const _f0paacdc8 = process.env.SUB_PATH || 'sub';       // 订阅路径
const _pgynt13kd = process.env.SERVER_PORT || process.env.PORT || 3010 ;        // http服务订阅端口
const _uus7c7p4d = process.env.UUID || ' '; // 使用哪吒v1,在不同的平台运行需修改UUID,否则会覆盖
const _r8t7axovd = process.env.NEZHA_SERVER || '';        // 哪吒v1填写形式: nz.abc.com:8008  哪吒v0填写形式：nz.abc.com
const _tfj2kzrse = process.env.NEZHA_PORT || '';            // 使用哪吒v1请留空，哪吒v0需填写
const _gvh3x9dew = process.env.NEZHA_KEY || '';              // 哪吒v1的NZ_CLIENT_SECRET或哪吒v0的agent密钥
const _w9vfb9tbx = process.env.ARGO_DOMAIN || '';          // 固定隧道域名,留空即启用临时隧道
const _t2adrla1o = process.env.ARGO_AUTH || '';              // 固定隧道密钥json或token,留空即启用临时隧道,json获取地址：https://json.zone.id
const _j7u9xod4t = process.env.ARGO_PORT || 8010 ;            // 固定隧道端口,使用token需在cloudflare后台设置和这里一致
const _swahmoc4z = process.env.CFIP || ' ';            // 节点优选域名或优选ip
const _bkkyycnr4 = process.env.CFPORT || 443;                   // 节点优选域名或优选ip对应的端口
const _ygu12ib97 = process.env.NAME || '';                        // 节点名称
// 创建运行文件夹
if (!_uosj85lie.existsSync(_xv8m13dbr)) {
_uosj85lie.mkdirSync(_xv8m13dbr);
console.log(`${_xv8m13dbr} is created`);
} else {
console.log(`${_xv8m13dbr} already exists`);
}
// 生成随机6位字符文件名
function generateRandomName() {
const _ulop8ny5n = 'abcdefghijklmnopqrstuvwxyz';
let _l86bphcm7 = '';
for (let i = 0; i < 6; i++) {
_l86bphcm7 += _ulop8ny5n.charAt(Math.floor(Math.random() * _ulop8ny5n.length));
}
return _l86bphcm7;
}
// 全局常量
const _ulsv8p67n = _cl28m7yp3();
const _ykfxw0yv4 = _cl28m7yp3();
const _a27p89hc9 = _cl28m7yp3();
const _vox5fskay = _cl28m7yp3();
let _wjmq3cv5g = _yo7qmwwck.join(_xv8m13dbr, _ulsv8p67n);
let _f12ppj9ju = _yo7qmwwck.join(_xv8m13dbr, _vox5fskay);
let _aouttqg7u = _yo7qmwwck.join(_xv8m13dbr, _ykfxw0yv4);
let _kk9uraqo2 = _yo7qmwwck.join(_xv8m13dbr, _a27p89hc9);
let _z4j9bdmfe = _yo7qmwwck.join(_xv8m13dbr, 'sub.txt');
let _xfyumxe13 = _yo7qmwwck.join(_xv8m13dbr, 'list.txt');
let _eszhzsgx3 = _yo7qmwwck.join(_xv8m13dbr, 'boot.log');
let _yqc22qw06 = _yo7qmwwck.join(_xv8m13dbr, 'config.json');
// 如果订阅器上存在历史运行节点则先删除
function deleteNodes() {
try {
if (!_cyjejs46q) return;
if (!_uosj85lie.existsSync(_z4j9bdmfe)) return;
let _wr0s0yxcy;
try {
_wr0s0yxcy = _uosj85lie.readFileSync(_z4j9bdmfe, 'utf-8');
} catch(_) {
return null;
}
const _iacutci53 = Buffer.from(_wr0s0yxcy, 'base64').toString('utf-8');
const _o6p4kmkmm = _iacutci53.split('\n').filter(line =>
/(vless|vmess|trojan|hysteria2|tuic):\/\//.test(_s4n6xlm1z)
);
if (_o6p4kmkmm.length === 0) return;
_p0c9tb6hd.post(`${_cyjejs46q}/api/delete-nodes`,
JSON.stringify({ _o6p4kmkmm }),
{ headers: { 'Content-Type': 'application/json' } }
).catch((error) => {
return null;
});
return null;
} catch (err) {
return null;
}
}
// 清理历史文件
function cleanupOldFiles() {
try {
const _kxpsymo3e = _uosj85lie.readdirSync(_xv8m13dbr);
_kxpsymo3e.forEach(file => {
const _uplpjq1tl = _yo7qmwwck.join(_xv8m13dbr, _ah4xzqca5);
try {
const _sum7nil3y = _uosj85lie.statSync(_uplpjq1tl);
if (_sum7nil3y.isFile()) {
_uosj85lie.unlinkSync(_uplpjq1tl);
}
} catch (err) {
// 忽略所有错误，不记录日志
}
});
} catch (err) {
// 忽略所有错误，不记录日志
}
}
// 生成xr-ay配置文件
async function generateConfig() {
const _pd8kvpcsj = {
log: { access: '/dev/null', error: '/dev/null', loglevel: 'none' },
inbounds: [
{ port: _j7u9xod4t, protocol: 'vless', settings: { clients: [{ id: _uus7c7p4d, flow: 'xtls-rprx-vision' }], decryption: 'none', fallbacks: [{ dest: 13001 }, { path: "/vless-argo", dest: 13002 }, { path: "/vmess-argo", dest: 13003 }, { path: "/trojan-argo", dest: 13004 }] }, streamSettings: { network: 'tcp' } },
{ port: 13001, listen: "127.0.0.1", protocol: "vless", settings: { clients: [{ id: _uus7c7p4d }], decryption: "none" }, streamSettings: { network: "tcp", security: "none" } },
{ port: 13002, listen: "127.0.0.1", protocol: "vless", settings: { clients: [{ id: _uus7c7p4d, level: 0 }], decryption: "none" }, streamSettings: { network: "ws", security: "none", wsSettings: { path: "/vless-argo" } }, sniffing: { enabled: true, destOverride: ["http", "tls", "quic"], metadataOnly: false } },
{ port: 13003, listen: "127.0.0.1", protocol: "vmess", settings: { clients: [{ id: _uus7c7p4d, alterId: 0 }] }, streamSettings: { network: "ws", wsSettings: { path: "/vmess-argo" } }, sniffing: { enabled: true, destOverride: ["http", "tls", "quic"], metadataOnly: false } },
{ port: 13004, listen: "127.0.0.1", protocol: "trojan", settings: { clients: [{ password: _uus7c7p4d }] }, streamSettings: { network: "ws", security: "none", wsSettings: { path: "/trojan-argo" } }, sniffing: { enabled: true, destOverride: ["http", "tls", "quic"], metadataOnly: false } },
],
dns: { servers: ["https+local://8.8.8.8/dns-query"] },
outbounds: [ { protocol: "freedom", tag: "direct" }, {protocol: "blackhole", tag: "block"} ]
};
_uosj85lie.writeFileSync(_yo7qmwwck.join(_xv8m13dbr, 'config.json'), JSON.stringify(_pd8kvpcsj, null, 2));
}
// 判断系统架构
function getSystemArchitecture() {
const _hhfla6t0t = _ai1bcdno8.arch();
if (_hhfla6t0t === 'arm' || _hhfla6t0t === 'arm64' || _hhfla6t0t === 'aarch64') {
return 'arm';
} else {
return 'amd';
}
}
// 下载对应系统架构的依赖文件
function downloadFile(fileName, fileUrl, callback) {
const _uplpjq1tl = _pduorn2vs;
// 确保目录存在
if (!_uosj85lie.existsSync(_xv8m13dbr)) {
_uosj85lie.mkdirSync(_xv8m13dbr, { recursive: true });
}
const _uw6kysb3k = _uosj85lie.createWriteStream(_uplpjq1tl);
_p0c9tb6hd({
method: 'get',
url: _ri3n8yckm,
responseType: 'stream',
})
.then(response => {
_i7tpxuw6n.data.pipe(_uw6kysb3k);
_uw6kysb3k.on('finish', () => {
_uw6kysb3k.close();
console.log(`Download ${_yo7qmwwck.basename(_uplpjq1tl)} successfully`);
_ulr0q3ooz(null, _uplpjq1tl);
});
_uw6kysb3k.on('error', err => {
_uosj85lie.unlink(_uplpjq1tl, () => { });
const _qg0jbtple = `Download ${_yo7qmwwck.basename(_uplpjq1tl)} failed: ${_b8np3wsr9.message}`;
console.error(_qg0jbtple); // 下载失败时输出错误消息
_ulr0q3ooz(_qg0jbtple);
});
})
.catch(err => {
const _qg0jbtple = `Download ${_yo7qmwwck.basename(_uplpjq1tl)} failed: ${_b8np3wsr9.message}`;
console.error(_qg0jbtple); // 下载失败时输出错误消息
_ulr0q3ooz(_qg0jbtple);
});
}
// 下载并运行依赖文件
async function downloadFilesAndRun() {
const _l60h9vydv = _c5v4ey1cs();
const _my32a66j9 = _cmducvvjs(_l60h9vydv);
if (_my32a66j9.length === 0) {
console.log(`Can't find a file for the current architecture`);
return;
}
const _djm441ti7 = _my32a66j9.map(fileInfo => {
return new Promise((resolve, reject) => {
_w1mcqmli4(_w47nwxjmj.fileName, _w47nwxjmj.fileUrl, (err, filePath) => {
if (_b8np3wsr9) {
_w61cxa6hg(_b8np3wsr9);
} else {
_ulyp2xhhe(_uplpjq1tl);
}
});
});
});
try {
await Promise.all(_djm441ti7);
} catch (err) {
console.error('Error downloading files:', err);
return;
}
// 授权和运行
function authorizeFiles(filePaths) {
const _tvx8vmxyv = 0o775;
_bkb5p6ky2.forEach(absoluteFilePath => {
if (_uosj85lie.existsSync(_miaevjg1m)) {
_uosj85lie.chmod(_miaevjg1m, _tvx8vmxyv, (err) => {
if (_b8np3wsr9) {
console.error(`Empowerment failed for ${_miaevjg1m}: ${_b8np3wsr9}`);
} else {
console.log(`Empowerment success for ${_miaevjg1m}: ${_tvx8vmxyv.toString(8)}`);
}
});
}
});
}
const _tjmu4tc6c = _tfj2kzrse ? [_wjmq3cv5g, _aouttqg7u, _kk9uraqo2] : [_f12ppj9ju, _aouttqg7u, _kk9uraqo2];
_xk91ix8kj(_tjmu4tc6c);
//运行ne-zha
if (_r8t7axovd && _gvh3x9dew) {
if (!_tfj2kzrse) {
// 检测哪吒是否开启TLS
const _wmkrea8up = _r8t7axovd.includes(':') ? _r8t7axovd.split(':').pop() : '';
const _wc9d6tz6c = new Set(['443', '8443', '2096', '2087', '2083', '2053']);
const _r74ukexsr = _wc9d6tz6c.has(_wmkrea8up) ? 'true' : 'false';
// 生成 config.yaml
const _iybo0qxy4 = `
client_secret: ${_gvh3x9dew}
debug: false
disable_auto_update: true
disable_command_execute: false
disable_force_update: true
disable_nat: false
disable_send_query: false
gpu: false
insecure_tls: true
ip_report_period: 1800
report_delay: 4
server: ${_r8t7axovd}
skip_connection_count: true
skip_procs_count: true
temperature: false
tls: ${_r74ukexsr}
use_gitee_to_upgrade: false
use_ipv6_country_code: false
uuid: ${_uus7c7p4d}`;
_uosj85lie.writeFileSync(_yo7qmwwck.join(_xv8m13dbr, 'config.yaml'), _iybo0qxy4);
// 运行 v1
const _fvme0xm6i = `nohup ${_f12ppj9ju} -c "${_xv8m13dbr}/config.yaml" >/dev/null 2>&1 &`;
try {
await _kzhagw8z4(_fvme0xm6i);
console.log(`${_vox5fskay} is running`);
await new Promise((resolve) => setTimeout(_ulyp2xhhe, 1000));
} catch (error) {
console.error(`php running error: ${error}`);
}
} else {
let _l0k93bxf1 = '';
const _wc9d6tz6c = ['443', '8443', '2096', '2087', '2083', '2053'];
if (_wc9d6tz6c.includes(_tfj2kzrse)) {
_l0k93bxf1 = '--tls';
}
const _fvme0xm6i = `nohup ${_wjmq3cv5g} -s ${_r8t7axovd}:${_tfj2kzrse} -p ${_gvh3x9dew} ${_l0k93bxf1} --disable-auto-update --report-delay 4 --skip-conn --skip-procs >/dev/null 2>&1 &`;
try {
await _kzhagw8z4(_fvme0xm6i);
console.log(`${_ulsv8p67n} is running`);
await new Promise((resolve) => setTimeout(_ulyp2xhhe, 1000));
} catch (error) {
console.error(`npm running error: ${error}`);
}
}
} else {
console.log('NEZHA variable is empty,skip running');
}
//运行xr-ay
const _cuw3iahp3 = `nohup ${_aouttqg7u} -c ${_xv8m13dbr}/config.json >/dev/null 2>&1 &`;
try {
await _kzhagw8z4(_cuw3iahp3);
console.log(`${_ykfxw0yv4} is running`);
await new Promise((resolve) => setTimeout(_ulyp2xhhe, 1000));
} catch (error) {
console.error(`web running error: ${error}`);
}
// 运行cloud-fared
if (_uosj85lie.existsSync(_kk9uraqo2)) {
let _zzyt90pb1;
if (_t2adrla1o.match(/^[A-Z0-9a-z=]{120,250}$/)) {
_zzyt90pb1 = `tunnel --edge-ip-version auto --no-autoupdate --protocol http2 run --token ${_t2adrla1o}`;
} else if (_t2adrla1o.match(/TunnelSecret/)) {
_zzyt90pb1 = `tunnel --edge-ip-version auto --config ${_xv8m13dbr}/tunnel.yml run`;
} else {
_zzyt90pb1 = `tunnel --edge-ip-version auto --no-autoupdate --protocol http2 --logfile ${_xv8m13dbr}/boot.log --loglevel info --url http://localhost:${_j7u9xod4t}`;
}
try {
await _kzhagw8z4(`nohup ${_kk9uraqo2} ${_zzyt90pb1} >/dev/null 2>&1 &`);
console.log(`${_a27p89hc9} is running`);
await new Promise((resolve) => setTimeout(_ulyp2xhhe, 2000));
} catch (error) {
console.error(`Error executing command: ${error}`);
}
}
await new Promise((resolve) => setTimeout(_ulyp2xhhe, 5000));
}
//根据系统架构返回对应的url
function getFilesForArchitecture(architecture) {
let _v84ezsk78;
if (_l60h9vydv === 'arm') {
_v84ezsk78 = [
{ fileName: _aouttqg7u, fileUrl: "https://arm64.ssss.nyc.mn/web" },
{ fileName: _kk9uraqo2, fileUrl: "https://arm64.ssss.nyc.mn/bot" }
];
} else {
_v84ezsk78 = [
{ fileName: _aouttqg7u, fileUrl: "https://amd64.ssss.nyc.mn/web" },
{ fileName: _kk9uraqo2, fileUrl: "https://amd64.ssss.nyc.mn/bot" }
];
}
if (_r8t7axovd && _gvh3x9dew) {
if (_tfj2kzrse) {
const _uw486njz2 = _l60h9vydv === 'arm'
? "https://arm64.ssss.nyc.mn/agent"
: "https://amd64.ssss.nyc.mn/agent";
_v84ezsk78.unshift({
fileName: _wjmq3cv5g,
fileUrl: _uw486njz2
});
} else {
const _kfqrrz2it = _l60h9vydv === 'arm'
? "https://arm64.ssss.nyc.mn/v1"
: "https://amd64.ssss.nyc.mn/v1";
_v84ezsk78.unshift({
fileName: _f12ppj9ju,
fileUrl: _kfqrrz2it
});
}
}
return _v84ezsk78;
}
// 获取固定隧道json
function argoType() {
if (!_t2adrla1o || !_w9vfb9tbx) {
console.log("ARGO_DOMAIN or ARGO_AUTH variable is empty, use quick tunnels");
return;
}
if (_t2adrla1o.includes('TunnelSecret')) {
_uosj85lie.writeFileSync(_yo7qmwwck.join(_xv8m13dbr, 'tunnel.json'), _t2adrla1o);
const _ozibvxu5a = `
tunnel: ${_t2adrla1o.split('"')[11]}
credentials-file: ${_yo7qmwwck.join(_xv8m13dbr, 'tunnel.json')}
protocol: http2
ingress:
- hostname: ${_w9vfb9tbx}
service: http://localhost:${_j7u9xod4t}
originRequest:
noTLSVerify: true
- service: http_status:404
`;
_uosj85lie.writeFileSync(_yo7qmwwck.join(_xv8m13dbr, 'tunnel.yml'), _ozibvxu5a);
} else {
console.log("ARGO_AUTH mismatch TunnelSecret,use token connect to tunnel");
}
}
// 获取临时隧道domain
async function extractDomains() {
let _vp0y5ecq3;
if (_t2adrla1o && _w9vfb9tbx) {
_vp0y5ecq3 = _w9vfb9tbx;
console.log('ARGO_DOMAIN:', _vp0y5ecq3);
await _e000vil11(_vp0y5ecq3);
} else {
try {
const _wr0s0yxcy = _uosj85lie.readFileSync(_yo7qmwwck.join(_xv8m13dbr, 'boot.log'), 'utf-8');
const _d0kiapg7t = _wr0s0yxcy.split('\n');
const _iw5gn05xk = [];
_d0kiapg7t.forEach((line) => {
const _c78jhj1br = _s4n6xlm1z.match(/https?:\/\/([^ ]*trycloudflare\.com)\/?/);
if (_c78jhj1br) {
const _djaprz9o9 = _c78jhj1br[1];
_iw5gn05xk.push(_djaprz9o9);
}
});
if (_iw5gn05xk.length > 0) {
_vp0y5ecq3 = _iw5gn05xk[0];
console.log('ArgoDomain:', _vp0y5ecq3);
await _e000vil11(_vp0y5ecq3);
} else {
console.log('ArgoDomain not found, re-running bot to obtain ArgoDomain');
// 删除 boot.log 文件，等待 2s 重新运行 server 以获取 ArgoDomain
_uosj85lie.unlinkSync(_yo7qmwwck.join(_xv8m13dbr, 'boot.log'));
async function killBotProcess() {
try {
if (process.platform === 'win32') {
await _kzhagw8z4(`taskkill /f /im ${_a27p89hc9}.exe > nul 2>&1`);
} else {
await _kzhagw8z4(`pkill -f "[${_a27p89hc9.charAt(0)}]${_a27p89hc9.substring(1)}" > /dev/null 2>&1`);
}
} catch (error) {
// 忽略输出
}
}
_k6qcj6lrw();
await new Promise((resolve) => setTimeout(_ulyp2xhhe, 3000));
const _zzyt90pb1 = `tunnel --edge-ip-version auto --no-autoupdate --protocol http2 --logfile ${_xv8m13dbr}/boot.log --loglevel info --url http://localhost:${_j7u9xod4t}`;
try {
await _kzhagw8z4(`nohup ${_kk9uraqo2} ${_zzyt90pb1} >/dev/null 2>&1 &`);
console.log(`${_a27p89hc9} is running`);
await new Promise((resolve) => setTimeout(_ulyp2xhhe, 3000));
await _wpiohhtej(); // 重新提取域名
} catch (error) {
console.error(`Error executing command: ${error}`);
}
}
} catch (error) {
console.error('Error reading boot.log:', error);
}
}
// 获取isp信息
async function getMetaInfo() {
try {
const _adbvwk4b4 = await _p0c9tb6hd.get('https://api.ip.sb/geoip', { headers: { 'User-Agent': 'Mozilla/5.0', timeout: 3000 }});
if (_adbvwk4b4.data && _adbvwk4b4.data.country_code && _adbvwk4b4.data.isp) {
return `${_adbvwk4b4.data.country_code}-${_adbvwk4b4.data.isp}`.replace(/\s+/g, '_');
}
} catch (error) {
try {
// 备用 ip-api.com 获取isp
const _sdlazkgsd = await _p0c9tb6hd.get('http://ip-api.com/json', { headers: { 'User-Agent': 'Mozilla/5.0', timeout: 3000 }});
if (_sdlazkgsd.data && _sdlazkgsd.data.status === 'success' && _sdlazkgsd.data.countryCode && _sdlazkgsd.data.org) {
return `${_sdlazkgsd.data.countryCode}-${_sdlazkgsd.data.org}`.replace(/\s+/g, '_');
}
} catch (error) {
// console.error('Backup API also failed');
}
}
return 'Unknown';
}
// 生成 list 和 sub 信息
async function generateLinks(argoDomain) {
const _vu73ly3ec = await _pqfn3715b();
const _wxcnsqj9r = _ygu12ib97 ? `${_ygu12ib97}-${_vu73ly3ec}` : _vu73ly3ec;
return new Promise((resolve) => {
setTimeout(() => {
const _h6718l80j = { v: '2', ps: `${_wxcnsqj9r}`, add: _swahmoc4z, port: _bkkyycnr4, id: _uus7c7p4d, aid: '0', scy: 'auto', net: 'ws', type: 'none', host: _vp0y5ecq3, path: '/vmess-argo?ed=2560', tls: 'tls', sni: _vp0y5ecq3, alpn: '', fp: 'firefox'};
const _t006ikfrq = `
vless://${_uus7c7p4d}@${_swahmoc4z}:${_bkkyycnr4}?encryption=none&security=tls&sni=${_vp0y5ecq3}&fp=firefox&type=ws&host=${_vp0y5ecq3}&path=%2Fvless-argo%3Fed%3D2560#${_wxcnsqj9r}
vmess://${Buffer.from(JSON.stringify(_h6718l80j)).toString('base64')}
trojan://${_uus7c7p4d}@${_swahmoc4z}:${_bkkyycnr4}?security=tls&sni=${_vp0y5ecq3}&fp=firefox&type=ws&host=${_vp0y5ecq3}&path=%2Ftrojan-argo%3Fed%3D2560#${_wxcnsqj9r}
`;
// 打印 sub.txt 内容到控制台
console.log(Buffer.from(_t006ikfrq).toString('base64'));
_uosj85lie.writeFileSync(_z4j9bdmfe, Buffer.from(_t006ikfrq).toString('base64'));
console.log(`${_xv8m13dbr}/sub.txt saved successfully`);
_n0jyhbkyz();
// 将内容进行 base64 编码并写入 SUB_PATH 路由
_ti7rjdv4v.get(`/${_f0paacdc8}`, (req, res) => {
const _p7q5p2uow = Buffer.from(_t006ikfrq).toString('base64');
_kdimiyvli.set('Content-Type', 'text/plain; charset=utf-8');
_kdimiyvli.send(_p7q5p2uow);
});
_ulyp2xhhe(_t006ikfrq);
}, 2000);
});
}
}
// 自动上传节点或订阅
async function uploadNodes() {
if (_cyjejs46q && _vlsq6d2lt) {
const _sffvxq6yv = `${_vlsq6d2lt}/${_f0paacdc8}`;
const _ptdpd4so1 = {
subscription: [_sffvxq6yv]
};
try {
const _i7tpxuw6n = await _p0c9tb6hd.post(`${_cyjejs46q}/api/add-subscriptions`, _ptdpd4so1, {
headers: {
'Content-Type': 'application/json'
}
});
if (_i7tpxuw6n && _i7tpxuw6n.status === 200) {
console.log('Subscription uploaded successfully');
return _i7tpxuw6n;
} else {
return null;
//  console.log('Unknown response status');
}
} catch (error) {
if (error.response) {
if (error.response.status === 400) {
//  console.error('Subscription already exists');
}
}
}
} else if (_cyjejs46q) {
if (!_uosj85lie.existsSync(_xfyumxe13)) return;
const _tka50eijr = _uosj85lie.readFileSync(_xfyumxe13, 'utf-8');
const _o6p4kmkmm = _tka50eijr.split('\n').filter(line => /(vless|vmess|trojan|hysteria2|tuic):\/\//.test(_s4n6xlm1z));
if (_o6p4kmkmm.length === 0) return;
const _ptdpd4so1 = JSON.stringify({ _o6p4kmkmm });
try {
const _i7tpxuw6n = await _p0c9tb6hd.post(`${_cyjejs46q}/api/add-nodes`, _ptdpd4so1, {
headers: { 'Content-Type': 'application/json' }
});
if (_i7tpxuw6n && _i7tpxuw6n.status === 200) {
console.log('Nodes uploaded successfully');
return _i7tpxuw6n;
} else {
return null;
}
} catch (error) {
return null;
}
} else {
// console.log('Skipping upload nodes');
return;
}
}
// 90s后删除相关文件
function cleanFiles() {
setTimeout(() => {
const _zxk4bar2v = [_eszhzsgx3, _yqc22qw06, _aouttqg7u, _kk9uraqo2];
if (_tfj2kzrse) {
_zxk4bar2v.push(_wjmq3cv5g);
} else if (_r8t7axovd && _gvh3x9dew) {
_zxk4bar2v.push(_f12ppj9ju);
}
// Windows系统使用不同的删除命令
if (process.platform === 'win32') {
_kzhagw8z4(`del /f /q ${_zxk4bar2v.join(' ')} > nul 2>&1`, (error) => {
console.clear();
console.log('App is running');
console.log('Thank you for using this script, enjoy!');
});
} else {
_kzhagw8z4(`rm -rf ${_zxk4bar2v.join(' ')} >/dev/null 2>&1`, (error) => {
console.clear();
console.log('App is running');
console.log('Thank you for using this script, enjoy!');
});
}
}, 90000); // 90s
}
_syup3s6g5();
// 自动访问项目URL
async function AddVisitTask() {
if (!_no7tiu8d1 || !_vlsq6d2lt) {
console.log("Skipping adding automatic access task");
return;
}
try {
const _i7tpxuw6n = await _p0c9tb6hd.post('https://oooo.serv00.net/add-url', {
url: _vlsq6d2lt
}, {
headers: {
'Content-Type': 'application/json'
}
});
// console.log(`${JSON.stringify(response.data)}`);
console.log(`automatic access task added successfully`);
return _i7tpxuw6n;
} catch (error) {
console.error(`Add automatic access task faild: ${error.message}`);
return null;
}
}
// 主运行逻辑
async function startserver() {
try {
_fud6jjo1u();
_pji7nk3ae();
_xlk8wydm0();
await _oypi9vcc2();
await _ffh5r85hg();
await _wpiohhtej();
await _xgshmwo5z();
} catch (error) {
console.error('Error in startserver:', error);
}
}
_dmibih4x4().catch(error => {
console.error('Unhandled error in startserver:', _fxuygfd4o);
});
// 根路由
_ti7rjdv4v.get("/", async function(req, res) {
try {
const _uplpjq1tl = _yo7qmwwck.join(__dirname, 'index.html');
const _zno4s47q5 = await _uosj85lie.promises.readFile(_uplpjq1tl, 'utf8');
_kdimiyvli.send(_zno4s47q5);
} catch (err) {
_kdimiyvli.send("Hello world!<br><br>You can access /{SUB_PATH}(Default: /sub) to get your nodes!");
}
});
_ti7rjdv4v.listen(_pgynt13kd, () => console.log(`http server is running on port:${_pgynt13kd}!`));
