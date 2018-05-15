"use strict";
const chalk = require("chalk");
const gradient = require("tinygradient");
const testNames = require("./contractNames");
const emoji = require('./emoji.json');

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

    formatAddressBlocks(address) {
        //check if address is a properly formatted Ethereum address
        if (!address) return undefined;
        //each character is colored by its position plus ansii code
        let rgbs = [];
        let string = `<span style="font-family: 'roboto mono';font-size: 70%; font-weight: lighter !important; color: #000">0X</span><span style="font-family: 'roboto mono'; font-weight: bold">`;

        let palette = this.palettes[
                (address.charCodeAt(2) + address.charCodeAt(8) + address.charCodeAt(15)) % this.palettes.length
            ]
        for (let i = 2; i < address.length - 2; i+= 2) {
            let char = address[i-1];
            let ca = address.charCodeAt(i);
            let cb = address.charCodeAt(i+1);
            let cc = address.charCodeAt(i+1);
            let underline = i % 3 == 0 ? 'text-decoration:underline' : '';
            let rgb = palette[Math.round((ca + cb + cc) % palette.length)];
            string += `<span style="color: ${rgb} !important;${underline}">${address[i+1]}${address[i+2]}</span>`;
        }
        string += "</span>";
        return string;   
    }

    formatAddressBlocksEmoji(address) {
        //check if address is a properly formatted Ethereum address
        if (!address) return undefined;
        //each character is colored by its position plus ansii code
        let rgbs = [];
        let string = `<span style="font-family: 'roboto mono';font-size: 70%; font-weight: lighter !important; color: #000">0X</span><span style="font-family: 'roboto mono'; font-weight: bold">`;

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
        let string = `<span style="font-family: 'roboto mono';font-size: 70%; font-weight: lighter !important; color: #000">0X</span><span style="font-family: 'roboto mono'; font-weight: bold">`;

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

    formatAddressBlocksBorder(address) {
        //check if address is a properly formatted Ethereum address
        if (!address) return undefined;
        //each character is colored by its position plus ansii code
        let rgbs = [];
        let string = `<span style="font-family: 'roboto mono'; font-weight: bolder !important; color: #000; margin: 0 2px;">0X</span><span style="font-family: 'roboto mono'; font-weight: lighter">`;

        let palette = this.palettes[
                (address.charCodeAt(2) + address.charCodeAt(8) + address.charCodeAt(15)) % this.palettes.length
            ]
        for (let i = 2; i < address.length - 2; i+= 2) {
            let char = address[i-1];
            let ca = address.charCodeAt(i);
            let cb = address.charCodeAt(i+1);
            let cc = address.charCodeAt(i+1);
            let id = Math.round((ca + cb + cc) % emoji.length);
            let rgb = palette[Math.round((ca + cb + cc) % palette.length)];
            let underline = ca % 3 > 0 ? `border: 1 px solid ${rgb}; border-radius: 3px !important; color: white !important; background: ${rgb}`  : `color: #000 !important`;
            string += `<span style=" padding: 0 3px 0 3px; margin: 0 1px; ${underline}">${address[i+1]}${address[i+2]}</span>`;
        }
        string += "</span>";
        return string;   
    }


    colorString(string, color) {
        let rgb = this.gradients[
            (charCode * charCode2) % this.gradients.length
        ].rgbAt(charCode / 120);


    }


}

module.exports = IdentiAddress;