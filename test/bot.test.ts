import VideoTitleBot from "../src/bot"
import { expect } from "chai";


describe("Video Title Bot",() => {
    const titleId:string = "80192098";
    const countryCode:string = "us";

    var videoTitleBot: VideoTitleBot = new VideoTitleBot(titleId,countryCode);

    it(`Title id '${titleId}' olmalı.`, () => {
        expect(titleId).equal(videoTitleBot.titleId);
    });

    it(`Country code '${countryCode}' olmalı.`, () => {
        expect(countryCode).equal(videoTitleBot.countryCode);
    });

    it(`Fetch sonucu obje olmalı.`, () => {

    }); 
})