const {escape} = require('mysql');

exports.join_obj_query_by = (join_str,obj,valid_queries) => {
    let result = '';
    let keys = Object.keys(obj);
    for (let i = keys.length; i--;)
    {
        let key = keys[i];
        if (valid_queries.includes(key))
            result += ` ${key} = ${escape(obj[key])} ${i == 0 ? ';' : join_str} `;
    }
    return result;
}