
const Log = (text, label = "Rendered") => {

    if (process.env.NODE_ENV === 'development')
        console.log(`${label} ${text}`);

}

export default Log;
