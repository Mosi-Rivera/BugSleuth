export default (str) => {
    if (str)
        return (new Date(str)).toDateString();
    return null;
}