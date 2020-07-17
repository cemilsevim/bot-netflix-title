import axios from "axios";
import {promises as fs} from "fs";

class VideoTitle{
    private _title_id: string;
    private _countryCode: string;
    private _sections: object;
    
    constructor(titleId: string, countryCode: string = "us"){
        this._title_id = titleId;

        this._countryCode = countryCode;
    }

    public async fetch(): Promise<any>{
        try{
            var titleRawContent:any = await this.titleHttpRequest();
            
            var parsedContent = this.parseRawContent(titleRawContent);

            let sectionData = parsedContent.data.sectionData;

            if(sectionData.length > 0){
                sectionData.forEach((section) => {
                    
                });
            }
            parsedContent.sectionData

        }catch(e){
            console.error(e)
        }
        
        return null;
    }

    public async titleHttpRequest(): Promise<any>{    
        var httpHeaders = {
            "User-Agent" : "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
        };

        return new Promise((resolve,reject) => {
            axios.get(`https://netflix.com/${this.countryCode}/title/${this.titleId}`,{
                headers:httpHeaders
            })
            .then((response) => {
                if(response.status != 200)
                    reject("Http status code is not '200'");
                
                resolve(response.data);
            })
            .catch((error) => {
                reject(`Netflix http error: ${error}`);
            });
        });
    }

    public parseRawContent(rawContent: string): any{
        var regex = /"nmTitleUI":(.*?),"renderTruths/gm;

        let regExec = regex.exec(rawContent);

        if(regExec.length <= 1)
            throw new Error("Raw content parse error!");

        var content = this.replaceHexToChar(regExec[1]);

        return JSON.parse(content);
    }

    public replaceHexToChar(content: string): string{
        return content.replace(/(\\x[0-9aA-fF][0-9aA-fF])/gm,(match) => {
            return String.fromCharCode(parseInt(match.replace("\\x",""),16));
        });
    }

    get titleId(): string{
        return this._title_id;
    }

    get countryCode(): string{
        return this._countryCode;
    }
}

export default VideoTitle;