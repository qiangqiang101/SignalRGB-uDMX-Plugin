export function Name() { return "uDMX"; }
export function VendorId() { return 0x16C0; }
export function ProductId() { return 0x05DC; }
export function Publisher() { return "www.anyma.ch"; }
export function Size() { return [1,1]; }
export function Type() { return "Rawusb"; }
export function DefaultPosition(){return [1, 1]; }
export function DefaultScale(){return 5.0}
export function ControllableParameters() {
	return [
		{"property":"shutdownColor", "group":"lighting", "label":"Shutdown Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
		{"property":"LightingMode", "group":"lighting", "label":"Lighting Mode", "type":"combobox", "values":["Canvas", "Forced"], "default":"Canvas"},
		{"property":"forcedColor", "group":"lighting", "label":"Forced Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
		{"property":"brightnessChannel", "group":"lighting", "label":"Brightness Channel", "min":"1", "max":"15", "type":"number", "default":"6"},
		{"property":"redChannel", "group":"lighting", "label":"Red Channel", "min":"1", "max":"15", "type":"number", "default":"7"},
		{"property":"greenChannel", "group":"lighting", "label":"Green Channel", "min":"1", "max":"15", "type":"number", "default":"8"},
		{"property":"blueChannel", "group":"lighting", "label":"Blue Channel", "min":"1", "max":"15", "type":"number", "default":"9"},
        {"property":"whiteChannel", "group":"lighting", "label":"White Channel", "min":"1", "max":"15", "type":"number", "default":"10"},
        {"property":"whiteColor", "group":"lighting", "label":"White Color", "min":"0", "max":"255", "type":"number", "default":"255"},
	];
}

export function Initialize() {

}

var vLedNames = [ "uDMX" ]; 
var vLedPositions = [ [0,0] ];

export function LedNames() {
	return vLedNames;
}

export function LedPositions() {
	return vLedPositions;
}

export function Render() {
    const brightness = device.getBrightness();
    if(LightingMode === "Forced")
    {
        let color = hexToRgb(forcedColor);
        sendControlPacket(redChannel, color[0]);
        sendControlPacket(greenChannel, color[1]);
        sendControlPacket(blueChannel, color[2]);
        sendControlPacket(brightnessChannel, brightness);
    } 
    else
    {
        let color = device.color(...vLedPositions[0]);
        sendControlPacket(redChannel, color[0]);
        sendControlPacket(greenChannel, color[1]);
        sendControlPacket(blueChannel, color[2]);
        sendControlPacket(brightnessChannel, brightness);
    }
    sendControlPacket(whiteChannel, whiteColor);
}

export function Shutdown() {
    let color = hexToRgb(shutdownColor);
    sendControlPacket(redChannel, color[0]);
	sendControlPacket(greenChannel, color[1]);
	sendControlPacket(blueChannel, color[2]);
}

function sendControlPacket(channel, value){
    const packet = [0];
    const channel_offset = channel -1;
	//                  	type, req, val, index, data, length, timeout
	device.control_transfer(0x40, 1, value, channel_offset, packet, value, 1000);
}

function hexToRgb(hex) {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	let colors = [];
	colors[0] = parseInt(result[1], 16);
	colors[1] = parseInt(result[2], 16);
	colors[2] = parseInt(result[3], 16);

	return colors;
}

export function Validate(endpoint) {
	return endpoint.interface === 0 && endpoint.usage === 0 && endpoint.usage_page === 0;
}

export function ImageUrl()
{
	//If merged back into main project
	//return "https://raw.githubusercontent.com/qiangqiang101/SignalRGB-uDMX-Plugin/main/jc-light.png";
	return "https://raw.githubusercontent.com/naitoshedo/SignalRGB-uDMX-Plugin/main/jc-light.png";
}
