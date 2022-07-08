const updateObject = ( obj, key, value ) => {
    const newObj = {...obj};
    newObj[key] = value;
    return newObj;
};

export default updateObject;