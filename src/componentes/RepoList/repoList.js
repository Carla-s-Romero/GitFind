import './repo.css'

function repostList({title, description}){
    return(
        <div classname="item-list">
            <strong id="title">{title}</strong>
            <p id="description">{description}</p>
            <hr></hr>
        </div>
    );
}

export default repostList;