﻿AudioWorkletProcessor.prototype._h2=function(){this._i2=true;this.port.onmessage=(_j2)=>{if(_j2.data==="kill")this._i2=false;};};;class _k2 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1}];}constructor(){super();this._h2();}process(_l2,_m2,parameters){const _n2=_l2[0];for(let _o2=0;_o2<_n2.length;++_o2){const _p2=_n2[_o2];for(let _q2=0;_q2<_p2.length;++_q2)_m2[parameters.bypass[_q2]??parameters.bypass[0]][_o2][_q2]=_p2[_q2];
}return this._i2;}}class _r2 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"gain",automationRate:"a-rate",defaultValue:1,minValue:0}];}constructor(){super();this._h2();}process(_l2,_m2,parameters){const _s2=_l2[0];const _t2=_l2[1];const _u2=_m2[0];const gain=parameters.gain;for(let _o2=0;_o2<_t2.length;++_o2){const _p2=_t2[_o2];const _v2=_u2[_o2];for(let _q2=0;_q2<_p2.length;++_q2)_v2[_q2]=_p2[_q2];}for(let _o2=0;_o2<_s2.length;++_o2){const _p2=_s2[_o2];const _v2=_u2[_o2];for(let _q2=0;
_q2<_p2.length;++_q2)_v2[_q2]+=_p2[_q2]*(gain[_q2]??gain[0]);}return this._i2;}}registerProcessor("audio-bus-input",_k2);registerProcessor("audio-bus-output",_r2);class _w2 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"gain",automationRate:"a-rate",defaultValue:1.0,minValue:0.0},{name:"factor",automationRate:"a-rate",defaultValue:20,minValue:1,maxValue:100},{name:"resolution",automationRate:"a-rate",
defaultValue:8,minValue:2,maxValue:16},{name:"mix",automationRate:"a-rate",defaultValue:0.8,minValue:0.0,maxValue:1.0}];}static _x2=[undefined,undefined,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768];constructor(_y2){super();this._h2();const _z2=_y2.outputChannelCount[0];this._A2=new Float32Array(_z2);this._B2=new Uint32Array(_z2);}process(_l2,_m2,parameters){const _n2=_l2[0];const _u2=_m2[0];const bypass=parameters.bypass;const gain=parameters.gain;const factor=parameters.factor;const resolution=parameters.resolution;
const mix=parameters.mix;for(let _o2=0;_o2<_n2.length;++_o2){const _p2=_n2[_o2];const _v2=_u2[_o2];for(let _q2=0;_q2<_p2.length;++_q2){_v2[_q2]=_p2[_q2];if(this._B2[_o2]===0)this._A2[_o2]=_p2[_q2];++this._B2[_o2];this._B2[_o2]%=(factor[_q2]??factor[0]);if(bypass[_q2]??bypass[0])continue;let _C2=this._A2[_o2];const _D2=(gain[_q2]??gain[0]);_C2*=_D2;_C2=Math.max(Math.min(_C2,1.0),-1.0);const _E2=resolution[_q2]??resolution[0];const max=(_C2>0.0)?_w2._x2[_E2]-1:_w2._x2[_E2];_C2=Math.round(_C2*max)/max;const _F2=(mix[_q2]??mix[0]);
_v2[_q2]*=(1.0-_F2);_v2[_q2]+=(_C2*_F2);}}return this._i2;}}registerProcessor("bitcrusher-processor",_w2);class _G2 extends AudioWorkletProcessor{static _H2=5.0;static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"time",automationRate:"a-rate",defaultValue:0.2,minValue:0.0,maxValue:_G2._H2},{name:"feedback",automationRate:"a-rate",defaultValue:0.5,minValue:0.0,maxValue:1.0},{name:"mix",automationRate:"a-rate",defaultValue:0.35,minValue:0.0,
maxValue:1.0}];}constructor(_y2){super();this._h2();const _z2=_y2.outputChannelCount[0];const _I2=(_G2._H2*sampleRate)+1;this.buffer=new Array(_z2);this._J2=new Uint32Array(_z2);for(let _o2=0;_o2<_z2;++_o2)this.buffer[_o2]=new Float32Array(_I2);}process(_l2,_m2,parameters){const _n2=_l2[0];const _u2=_m2[0];const bypass=parameters.bypass;const time=parameters.time;const feedback=parameters.feedback;const mix=parameters.mix;for(let _o2=0;_o2<_n2.length;++_o2){const _p2=_n2[_o2];const _v2=_u2[_o2];for(let _q2=0;_q2<_p2.length;
++_q2){_v2[_q2]=_p2[_q2];const _K2=this._L2(_o2,(time[_q2]??time[0]));const _M2=_p2[_q2]+(_K2*(feedback[_q2]??feedback[0]));this.write(_o2,_M2);if((bypass[_q2]??bypass[0]))continue;const _F2=(mix[_q2]??mix[0]);_v2[_q2]*=(1-_F2);_v2[_q2]+=(_K2*_F2);}}return this._i2;}_L2(_N2,_O2){const _P2=_O2*sampleRate;let _Q2=(this._J2[_N2]-~~_P2);let _R2=(_Q2-1);while(_Q2<0)_Q2+=this.buffer[_N2].length;while(_R2<0)_R2+=this.buffer[_N2].length;const _S2=_P2-~~_P2;const _T2=this.buffer[_N2][_Q2];const _U2=this.buffer[_N2][_R2];
return _T2+(_U2-_T2)*_S2;}write(_N2,_V2){++this._J2[_N2];this._J2[_N2]%=this.buffer[_N2].length;this.buffer[_N2][this._J2[_N2]]=_V2;}}registerProcessor("delay-processor",_G2);class _W2 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"gain",automationRate:"a-rate",defaultValue:0.5,minValue:0.0}];}constructor(){super();this._h2();}process(_l2,_m2,parameters){const _n2=_l2[0];const _u2=_m2[0];const bypass=parameters.bypass;
const gain=parameters.gain;for(let _o2=0;_o2<_n2.length;++_o2){const _p2=_n2[_o2];const _v2=_u2[_o2];for(let _q2=0;_q2<_p2.length;++_q2){_v2[_q2]=_p2[_q2];if(bypass[_q2]??bypass[0])continue;_v2[_q2]*=(gain[_q2]??gain[0]);}}return this._i2;}}registerProcessor("gain-processor",_W2);class _X2 extends AudioWorkletProcessor{static get parameterDescriptors(){const _Y2=Math.min(sampleRate/2.0,20000.0);return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"cutoff",automationRate:"a-rate",
defaultValue:Math.min(1500.0,_Y2),minValue:10.0,maxValue:_Y2},{name:"q",automationRate:"a-rate",defaultValue:1.5,minValue:1.0,maxValue:100.0}];}constructor(_y2){super();this._h2();const _z2=_y2.outputChannelCount[0];this._Z2=0;this.__2=0;this._03=0;this._13=0;this._23=0;this._33=new Float32Array(_z2);this._43=new Float32Array(_z2);this._53=new Float32Array(_z2);this._63=new Float32Array(_z2);this._73=-1;this._83=-1;}process(_l2,_m2,parameters){const _n2=_l2[0];const _u2=_m2[0];const bypass=parameters.bypass;
const cutoff=parameters.cutoff;const q=parameters.q;const _93=(cutoff.length===1&&q.length===1);if(_93)this._a3(cutoff[0],q[0]);for(let _o2=0;_o2<_n2.length;++_o2){const _p2=_n2[_o2];const _v2=_u2[_o2];for(let _q2=0;_q2<_p2.length;++_q2){if(!_93)this._a3(cutoff[_q2]??cutoff[0],q[_q2]??q[0]);const _b3=this._03*_p2[_q2]+this._13*this._33[_o2]+this._23*this._43[_o2]-this._Z2*this._53[_o2]-this.__2*this._63[_o2];this._43[_o2]=this._33[_o2];this._33[_o2]=_p2[_q2];this._63[_o2]=this._53[_o2];this._53[_o2]=_b3;
_v2[_q2]=(bypass[_q2]??bypass[0])?_p2[_q2]:_b3;}}return this._i2;}_a3(_c3,_d3){if(_c3===this._73&&_d3===this._83)return;const _e3=2*Math.PI*_c3/sampleRate;const alpha=Math.sin(_e3)/(2*_d3);const _f3=Math.cos(_e3);const _g3=1+alpha;const _Z2=-2*_f3;const __2=1-alpha;const _03=(1+_f3)/2;const _13=-1-_f3;const _23=(1+_f3)/2;this._Z2=_Z2/_g3;this.__2=__2/_g3;this._03=_03/_g3;this._13=_13/_g3;this._23=_23/_g3;this._73=_c3;this._83=_d3;}}registerProcessor("hpf2-processor",_X2);class _h3 extends AudioWorkletProcessor{
static get parameterDescriptors(){const _Y2=Math.min(sampleRate/2.0,20000.0);return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"cutoff",automationRate:"a-rate",defaultValue:Math.min(500.0,_Y2),minValue:10.0,maxValue:_Y2},{name:"q",automationRate:"a-rate",defaultValue:1.5,minValue:1.0,maxValue:100.0}];}constructor(_y2){super();this._h2();const _z2=_y2.outputChannelCount[0];this._Z2=0;this.__2=0;this._03=0;this._13=0;this._23=0;this._33=new Float32Array(_z2);this._43=new Float32Array(_z2);
this._53=new Float32Array(_z2);this._63=new Float32Array(_z2);this._73=-1;this._83=-1;}process(_l2,_m2,parameters){const _n2=_l2[0];const _u2=_m2[0];const bypass=parameters.bypass;const cutoff=parameters.cutoff;const q=parameters.q;const _93=(cutoff.length===1&&q.length===1);if(_93)this._a3(cutoff[0],q[0]);for(let _o2=0;_o2<_n2.length;++_o2){const _p2=_n2[_o2];const _v2=_u2[_o2];for(let _q2=0;_q2<_p2.length;++_q2){if(!_93)this._a3(cutoff[_q2]??cutoff[0],q[_q2]??q[0]);const _b3=this._03*_p2[_q2]+this._13*this._33[_o2]+this._23*this._43[_o2]-this._Z2*this._53[_o2]-this.__2*this._63[_o2];
this._43[_o2]=this._33[_o2];this._33[_o2]=_p2[_q2];this._63[_o2]=this._53[_o2];this._53[_o2]=_b3;_v2[_q2]=(bypass[_q2]??bypass[0])?_p2[_q2]:_b3;}}return this._i2;}_a3(_c3,_d3){if(_c3===this._73&&_d3===this._83)return;const _e3=2*Math.PI*_c3/sampleRate;const alpha=Math.sin(_e3)/(2*_d3);const _f3=Math.cos(_e3);const _g3=1+alpha;const _Z2=-2*_f3;const __2=1-alpha;const _03=(1-_f3)/2;const _13=1-_f3;const _23=(1-_f3)/2;this._Z2=_Z2/_g3;this.__2=__2/_g3;this._03=_03/_g3;this._13=_13/_g3;this._23=_23/_g3;this._73=_c3;
this._83=_d3;}}registerProcessor("lpf2-processor",_h3);class _i3{constructor(_j3){this._k3=0;this._l3=0;this.feedback=0;this._m3=0;this.buffer=new Float32Array(_j3);this._n3=0;}process(_V2){const out=this.buffer[this._n3];this._m3=(this._m3*this._k3)+(out*this._l3);this.buffer[this._n3]=_V2+(this._m3*this.feedback);++this._n3;this._n3%=this.buffer.length;return out;}_o3(_p3){this.feedback=Math.min(Math.max(0,_p3),1);}_q3(_r3){this._k3=Math.min(Math.max(0,_r3),1);this._l3=1-this._k3;}}class _s3{constructor(_j3){
this.feedback=0;this.buffer=new Float32Array(_j3);this._n3=0;}process(_V2){const out=this.buffer[this._n3];this.buffer[this._n3]=_V2+(out*this.feedback);++this._n3;this._n3%=this.buffer.length;return(out-_V2);}_o3(_p3){this.feedback=Math.min(Math.max(0,_p3),1);}}class _t3 extends AudioWorkletProcessor{static _u3=8;static _v3=4;static _w3=0.015;static _x3=0.4;static _y3=0.28;static _z3=0.7;static _A3=[1116,1188,1277,1356,1422,1491,1557,1617];static _B3=[1139,1211,1300,1379,1445,1514,1580,1640];static _C3=[556,
441,341,225];static _D3=[579,464,364,248];static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"size",automationRate:"a-rate",defaultValue:0.7,minValue:0.0,maxValue:1.0},{name:"damp",automationRate:"a-rate",defaultValue:0.1,minValue:0.0,maxValue:1.0},{name:"mix",automationRate:"a-rate",defaultValue:0.35,minValue:0.0,maxValue:1.0}];}constructor(_y2){super();this._h2();const _z2=_y2.outputChannelCount[0];this._E3=-1;this._F3=-1;this._G3=new Array(_z2);
this._H3=new Array(_z2);const _I3=[_t3._A3,_t3._B3];const _J3=[_t3._C3,_t3._D3];for(let _o2=0;_o2<_z2;++_o2){this._G3[_o2]=new Array(_t3._u3);this._H3[_o2]=new Array(_t3._v3);for(let _K3=0;_K3<_t3._u3;++_K3)this._G3[_o2][_K3]=new _i3(_I3[_o2%_I3.length][_K3]);for(let _K3=0;_K3<_t3._v3;++_K3)this._H3[_o2][_K3]=new _s3(_J3[_o2%_J3.length][_K3]);}this._L3(0.5);this._q3(0.5);for(let _o2=0;_o2<_z2;++_o2)for(let _K3=0;_K3<_t3._v3;++_K3)this._H3[_o2][_K3]._o3(0.5);}process(_l2,_m2,parameters){const _n2=_l2[0];const _u2=_m2[0];
const bypass=parameters.bypass;const size=parameters.size;const damp=parameters.damp;const mix=parameters.mix;for(let _o2=0;_o2<_n2.length;++_o2){const _p2=_n2[_o2];const _v2=_u2[_o2];for(let _q2=0;_q2<_p2.length;++_q2){this._L3(size[_q2]??size[0]);this._q3(damp[_q2]??damp[0]);_v2[_q2]=_p2[_q2];let out=0;const _C2=_p2[_q2]*_t3._w3;for(let _K3=0;_K3<_t3._u3;++_K3)out+=this._G3[_o2][_K3].process(_C2);for(let _K3=0;_K3<_t3._v3;++_K3)out=this._H3[_o2][_K3].process(out);if(bypass[_q2]??bypass[0])continue;const _F2=(mix[_q2]??mix[0]);
_v2[_q2]*=(1-_F2);_v2[_q2]+=(out*_F2);}}return this._i2;}_L3(_j3){if(_j3===this._E3)return;const size=(_j3*_t3._y3)+_t3._z3;for(let _o2=0;_o2<this._G3.length;++_o2)for(let _K3=0;_K3<_t3._u3;++_K3)this._G3[_o2][_K3]._o3(size);this._E3=_j3;}_q3(_r3){if(_r3===this._F3)return;const damp=_r3*_t3._x3;for(let _o2=0;_o2<this._G3.length;++_o2)for(let _K3=0;_K3<_t3._u3;++_K3)this._G3[_o2][_K3]._q3(damp);this._F3=_r3;}}registerProcessor("reverb1-processor",_t3);class _M3 extends AudioWorkletProcessor{static get parameterDescriptors(){
return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"rate",automationRate:"a-rate",defaultValue:5.0,minValue:0.0,maxValue:20.0},{name:"intensity",automationRate:"a-rate",defaultValue:1.0,minValue:0.0,maxValue:1.0},{name:"offset",automationRate:"a-rate",defaultValue:0.0,minValue:0.0,maxValue:1.0},{name:"shape",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:4}];}constructor(_y2){super();this._h2();const _z2=_y2.outputChannelCount[0];this._N3=new Array(_z2).fill(1.0);
this._O3=new Array(_z2).fill(0.0);this._P3=new Array(_z2).fill(_Q3._R3._S3);this._T3=new Array(_z2);for(let _o2=0;_o2<_z2;++_o2){this._T3[_o2]=new _U3();this._T3[_o2]._V3(sampleRate);this._T3[_o2]._W3(this._N3[_o2]);this._T3[_o2]._X3(this._P3[_o2]);if(_o2%2===1){this._T3[_o2]._Y3(this._O3[_o2]);}}}process(_l2,_m2,parameters){const _n2=_l2[0];const _u2=_m2[0];const bypass=parameters.bypass;const rate=parameters.rate;const intensity=parameters.intensity;const offset=parameters.offset;const shape=parameters.shape;
for(let _o2=0;_o2<_n2.length;++_o2){const _p2=_n2[_o2];const _v2=_u2[_o2];for(let _q2=0;_q2<_p2.length;++_q2){_v2[_q2]=_p2[_q2];const _E2=rate[_q2]??rate[0];const _Z3=offset[_q2]??offset[0];const __3=shape[_q2]??shape[0];this._04(_o2,_E2,_Z3,__3);const _14=this._T3[_o2]._L2();if((bypass[_q2]??bypass[0])>0.0){continue;}const _K3=intensity[_q2]??intensity[0];const out=_p2[_q2]*_14*_K3;_v2[_q2]*=(1.0-_K3);_v2[_q2]+=out;}}return this._i2;}_04(_N2,_24,_34,_44){if(_24!==this._N3[_N2]){this._T3[_N2]._W3(_24);this._N3[_N2]=_24;
}if(_34!==this._O3[_N2]){if(_N2%2===1){this._T3[_N2]._Y3(_34);}this._O3[_N2]=_34;}if(_44!==this._P3[_N2]){this._T3[_N2]._X3(_44);this._P3[_N2]=_44;}}}registerProcessor("tremolo-processor",_M3);function _Q3(){}_Q3._R3={_S3:0,_54:1,_64:2,_74:3,_84:4,_94:5};_Q3._a4=function(_b4){return 1.0-_b4;};_Q3._c4=function(_b4){return _b4;};_Q3._d4=function(_b4){return 0.5*(Math.sin((_b4*2.0*Math.PI)-(Math.PI/2.0))+1.0);};_Q3._e4=function(_b4){if(_b4<0.5){return 0.0;}return 1.0;};_Q3._f4=function(_b4){if(_b4<0.5){return 2.0*_b4;
}return 2.0-(2.0*_b4);};_Q3._g4=[_Q3._a4,_Q3._c4,_Q3._d4,_Q3._e4,_Q3._f4];_h4._i4=512;_h4._j4=1.0/_h4._i4;function _h4(_k4){this.data=new Float32Array(_h4._i4);for(let _K3=0;_K3<_h4._i4;++_K3){this.data[_K3]=_k4(_K3*_h4._j4);}}_h4.prototype._L2=function(_b4){_b4=Math.max(0.0,_b4);_b4=Math.min(_b4,1.0);const _l4=_b4*_h4._i4;const _m4=~~_l4;const _n4=_l4-_m4;let _Q2=_m4;let _R2=_Q2+1;if(_Q2>=_h4._i4){_Q2-=_h4._i4;}if(_R2>=_h4._i4){_R2-=_h4._i4;}const _T2=this.data[_Q2];const _U2=this.data[_R2];return _T2+(_U2-_T2)*_n4;
};;_U3._o4=[];_U3._p4=!1;_U3._q4=0.0;_U3._r4=20.0;function _U3(){this._s4=48000;this.shape=_Q3._R3._64;this._t4=1.0;this._u4=0.0;this._j4=0.0;this._v4=0.0;if(_U3._p4==true){return;}for(let _K3=0;_K3<_Q3._R3._94;++_K3){_U3._o4[_K3]=new _h4(_Q3._g4[_K3]);}_U3._p4=true;}_U3._w4=function(){return(_U3._p4==!0);};_U3.prototype._V3=function(_x4){this._s4=_x4;this._y4();};;_U3.prototype._W3=function(_z4){_z4=Math.max(_U3._q4,_z4);_z4=Math.min(_z4,_U3._r4);this._t4=_z4;this._y4();};;_U3.prototype._Y3=function(_34){
_34=Math.max(0.0,_34);_34=Math.min(_34,1.0);const _A4=_34-this._v4;this._v4=_34;this._u4+=_A4;while(this._u4>=1.0){this._u4-=1.0;}while(this._u4<0.0){this._u4+=1.0;}};;_U3.prototype._X3=function(_44){_44=Math.max(0,_44);_44=Math.min(_44,_Q3._R3._94-1);this.shape=_44;};;_U3.prototype._L2=function(){const _B4=_U3._o4[this.shape]._L2(this._u4);this._u4+=this._j4;while(this._u4>=1.0){this._u4-=1.0;}return _B4;};;_U3.prototype._y4=function(){this._j4=this._t4/this._s4;};;