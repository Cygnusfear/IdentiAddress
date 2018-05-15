"use strict";
const chalk = require("chalk");
const gradient = require("tinygradient");
const testNames = require("./contractNames");
const emoji = require('./emoji.json');
const hash = require('object-hash');

class IdentiAddress {
    constructor() {
        this.palettes = [
        ["#3626A7", "#657ED4", "#FF331F", "#B185A7"],
        ["#F2994A", "#F2C94C", "#4AC29A", "#0ED2F7"],
        ["#8A716A", "#C2B8B2", "#197BBD", "#125E8A"],
        ["#005AA7", "#05A8AA", "#40E0D0", "#FF8C00"],
        ["#324376", "#F5DD90", "#F68E5F", "#F76C5E"],
        ["#124E78", "#F2BB05", "#D74E09", "#6E0E0A"]]
        this.gradients = [
            gradient("#0071bc", "#e5005d"),
            gradient("#D3959B", "#78ffd6"),
            gradient("#F2994A", "#F2C94C"),
            gradient("#4AC29A", "#0ED2F7"),
            gradient("#005AA7", "#FFFDE4"),
        ];
    }

    hexToRgb(hex) {
        var c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return {r:(c>>16)&255,g:(c>>8)&255,b: c&255};
        }
        throw new Error('Bad Hex');
    }

    hashAddress(address)
    {
        return hash(address.toUpperCase());
    }

    formatAddress(address) {
        //check if address is a properly formatted Ethereum address
        if (!address) return undefined;
        //each character is colored by its position plus ansii code
        let rgbs = [];
        let string = "";
        for (let i = 1; i < address.length; i++) {
            let char = address[i-1  ];
            let charCode = address.charCodeAt(i);
            let charCode2 = address.charCodeAt(10);
            let modulo = i % charCode;
            // console.log(charCode, i, modulo);
            let rgb = this.gradients[
                (charCode * charCode2) % this.gradients.length
            ].rgbAt(charCode / 120);
            string += `<span style="color: ${rgb} !important">${char}</span>`;
        }
        return string;   
    }

    formatAddressBlocksEmoji(address) {
        //check if address is a properly formatted Ethereum address
        if (!address) return undefined;
        //each character is colored by its position plus ansii code
        let rgbs = [];
        let string = `<span style="font-family: 'Dank Mono', 'roboto mono';font-size: 70%; font-weight: lighter !important; color: #000">0X</span><span style="font-family: 'Dank Mono', 'roboto mono'; font-weight: bold">`;

        let palette = this.palettes[
                (address.charCodeAt(2) + address.charCodeAt(8) + address.charCodeAt(15)) % this.palettes.length
            ]
        for (let i = 2; i < address.length - 2; i+= 2) {
            let char = address[i-1];
            let ca = address.charCodeAt(i);
            let cb = address.charCodeAt(i+1);
            let cc = address.charCodeAt(i+1);
            let underline = i % 3 == 0 ? 'text-decoration:underline' : '';
            let id = Math.round((ca + cb + cc) % emoji.length);
            let rgb = palette[Math.round((ca + cb + cc) % palette.length)];
            string += `<span style="color: ${rgb} !important;${underline}">${address[i+1]}${address[i+2]}${emoji[id].emoji}</span>`;
        }
        string += "</span>";
        return string;   
    }

    formatAddressBlocksEmojiOnly(address) {
        //check if address is a properly formatted Ethereum address
        if (!address) return undefined;
        //each character is colored by its position plus ansii code
        let rgbs = [];
        let string = `<span style="font-family: 'Dank Mono', 'roboto mono';font-size: 70%; font-weight: lighter !important; color: #000">0X</span><span style="font-family: 'Dank Mono', 'roboto mono'; font-weight: bold">`;

        let palette = this.palettes[
                (address.charCodeAt(2) + address.charCodeAt(8) + address.charCodeAt(15)) % this.palettes.length
            ]
        for (let i = 2; i < address.length - 2; i+= 2) {
            let char = address[i-1];
            let ca = address.charCodeAt(i);
            let cb = address.charCodeAt(i+1);
            let cc = address.charCodeAt(i+1);
            let underline = i % 3 == 0 ? 'text-decoration:underline' : '';
            let id = Math.round((ca + cb + cc) % emoji.length);
            let rgb = palette[Math.round((ca + cb + cc) % palette.length)];
            string += `<span style="color: ${rgb} !important;${underline}; white-space:nowrap">${emoji[id].emoji}</span>`;
        }
        string += "</span>";
        return string;   
    }

    formatAddressBlocks(address) {
        //check if address is a properly formatted Ethereum address
        if (!address) return undefined;
        //each character is colored by its position plus ansii code
        let rgbs = [];
        let hashed = hash(address.toUpperCase());
        let palette = this.palettes[
                (hashed.charCodeAt(2) + hashed.charCodeAt(8) + hashed.charCodeAt(15)) % this.palettes.length
            ]

        let border = palette[Math.round((hashed.charCodeAt(3)) % palette.length)];
        let string = `<span style=""><span style="font-family: 'Dank Mono', 'roboto mono'; font-weight: bolder !important; color: #000; margin: 0 2px;">0X</span><span style="font-family: 'Dank Mono', 'roboto mono'; font-weight: lighter">`;

        for (let i = 2; i < address.length - 1; i+= 2) {

            let char = address[i-1];
            let ca = hashed.charCodeAt(i);
            let cb = hashed.charCodeAt(i+1);
            let cc = hashed.charCodeAt(i+1);
            let id = Math.round((ca + cb + cc) % emoji.length);
            let hex = palette[Math.round((hashed.charCodeAt(5) + (ca * cb + cc)) % palette.length)];
            let rgb = hex ? this.hexToRgb(hex) : "#fffff";
            let rgbastring = `rgba(${rgb.r},${rgb.g},${rgb.b},1)`;
            let adresses = address[i+2] !== undefined ? `${address[i+1]}${address[i+2]}` : `${address[i+1]}`
            let underline = ca % 3 > 0 ? `border: 1px solid ${rgbastring}; border-radius: 3px !important; color: white !important; background: ${rgbastring}`  : `border: 1px solid #eee; border-radius: 3px !important; color: white !important; background: #fefefe; color: #000 !important`;
            string += `<span style=" padding: 0 3px 0 3px; margin: 0 1px; ${underline}">${adresses}</span>`;
        }
        string += "</span></span>";
        return string;   
    }


    formatAddressBlocksBorder(address) {
        //check if address is a properly formatted Ethereum address
        if (!address) return undefined;
        //each character is colored by its position plus ansii code
        let rgbs = [];
        let hashed = hash(address.toUpperCase());
        let palette = this.palettes[
                (hashed.charCodeAt(2) + hashed.charCodeAt(8) + hashed.charCodeAt(15)) % this.palettes.length
            ]

        let border = palette[Math.round((hashed.charCodeAt(3)) % palette.length)];
        let string = `<span style="font-family: 'Dank Mono', 'roboto mono'; font-weight: bolder !important; color: #000; margin: 0 2px;">0X</span><span style="border: 0px solid #aaa; border-radius: 5px;"><span style="font-family: 'Dank Mono', 'roboto mono'; font-weight: lighter;">`;

        for (let i = 2; i < address.length - 1; i+= 2) {

            let char = address[i-1];
            let ca = hashed.charCodeAt(i);
            let cb = hashed.charCodeAt(i+1);
            let cc = hashed.charCodeAt(i+1);
            let id = Math.round((ca + cb + cc) % emoji.length);
            let hex = palette[Math.round((hashed.charCodeAt(5) + (ca * cb + cc)) % palette.length)];
            let rgb = hex ? this.hexToRgb(hex) : "#fffff";
            let rgbastring = `rgba(${rgb.r},${rgb.g},${rgb.b},1)`;
            let adresses = address[i+2] !== undefined ? `${address[i+1]}${address[i+2]}` : `${address[i+1]}`
            let underline = ca % 3 > 0 ? `color: white !important; background: ${rgbastring}`  : `!important; color: white !important; background: #fefefe; color: #000 !important`;
            string += `<span style=" padding: 0 3px 0 3px; ${underline}">${adresses}</span>`;
        }
        string += "</span></span>";
        return string;  
    }


    colorString(string, color) {
        let rgb = this.gradients[
            (charCode * charCode2) % this.gradients.length
        ].rgbAt(charCode / 120);


    }


}

module.exports = IdentiAddress;