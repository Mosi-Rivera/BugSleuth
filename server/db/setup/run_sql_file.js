const fs = require('fs');
const readline = require('readline');

module.exports = function(script_path)
{
    const sql = require('../models/db');
    let str = '';
    let rl = readline.createInterface({
        input: fs.createReadStream(script_path),
        terminal: false,
    });
    rl.on('line',function(chunk){
        str += chunk.toString('ascii');
    })
    rl.on('close',async function()
    {
        let arr = str.split(';');
        if (arr[arr.length - 1] == '')
            arr.splice(arr.length - 1,1);
        try
        {
            for (let i = 0, l = arr.length; i < l; i++)
                await new Promise(
                    (resolve,reject) => sql.query(
                        arr[i] + ';',
                        (err) => {
                            if (err)
                                return reject(err);
                            return resolve();
                        }
                    )
                );
            sql.end();
            console.log('success!');
        }
        catch(err)
        {
            console.log(err);
            console.log('exit!');
            sql.end();
        }
    });
}