export const TitleFormatar = (title) =>{
    if(title.length > 25)
        return title.substring(0,25) + ". . . . ."
    return title
}