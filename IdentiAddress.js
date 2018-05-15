"use strict";
const chalk = require("chalk");
const gradient = require("tinygradient");
const testNames = require("./contractNames");

export default class IdentiAddress {
    constructor() {
        this.gradients = [
            gradient("#0071bc", "#e5005d"),
            gradient("#D3959B", "#000"),
            gradient("#D3959B", "#78ffd6"),
            gradient("#F2994A", "#F2C94C"),
            gradient("#EB5757", "#000"),
            gradient("#4AC29A", "#0ED2F7"),
        ];
    }

    formatAddress(address) {
        //check if address is a properly formatted Ethereum address
        if (!address) return undefined;
        //each character is colored by its position plus ansii code
        let colors = [];
        let rgbs = [];
        let chalkstring = "";
        let string = "";
        for (let i = 1; i < address.length; i++) {
            let char = address[i];
            let charCode = address.charCodeAt(i);
            let charCode2 = address.charCodeAt(10);
            let modulo = i % charCode;
            // console.log(charCode, i, modulo);
            let color = { r: charCode, g: charCode, b: charCode };
            colors.push(color);
            let rgb = this.gradients[
                (charCode + charCode2) % this.gradients.length
            ].rgbAt(charCode / 120);
            rgbs.push(rgb);
            chalkstring += chalk`{${rgb} ${char}}`;
            string += `<span style="${rgb}">${char}</span>`;
        }
        return string;   
    }
}

module.exports = IdentiAddress;