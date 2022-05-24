module.exports.handleErrors = (err)=>{
    let errors={};
    for(let key in err.errors){
        errors[key]=err.errors[key]['message'];
    }
    return errors;
}
