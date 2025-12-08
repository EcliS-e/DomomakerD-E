const helper = require('./helper.js');
const React = require('react');
const {useState, useEffect} = React;
const {createRoot} = require('react-dom/client');

const handleSearch = (e, setCurrentDomo ) => {
    e.preventDefault();
    helper.hideError();

    const name= e.target.querySelector('#domoName').value;
    
    if (!name){
       
        helper.handleError("Name is needed!");
        return false;

    }

    helper.sendPost(e.target.action, {name}, setCurrentDomo);
    return false;
}

    const handleAlter = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    
    if (!name){
       
        helper.handleError("Name is needed!");
        return false;

    }

    helper.sendPost(e.target.action, {name});
        return false;
    }

    
const SearchForm = (props) => {
    return(
        <form id="searchForm"
        onSubmit={(e) =>handleSearch(e, props.setCurrentDomo)}
        name='searchBar'
        action="/alter"
        method="POST"
        className='searchForm'
        >
            <label htmlFor="name">Name:</label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name"/>
             <input className="searchDomoSubmit" type="submit" value="searchDomo"/>
        </form>
    
  
    )
}

const Domo = (props) =>{

    return (
         <div key={props.domo.id} className="domo">
        <div className="domo">
            <img src="/assets/img/domoface.jpeg" alt="domo face" className='domoFace' /><h3 className='domoName'>Name:{props.domo.name}</h3>
        <h3 className='domoAge'>age: {props.domo.age}</h3>
         <h3 className='domoOccupation'>Occupation: {props.domo.occupation}</h3>
        </div>
       </div>
        
    );
};

const App = () => {

    const[currentDomo, setCurrentDomo] = useState({});

    if(Object.keys(currentDomo).length === 0) {
        return (
            <div>
                <div id="loadDomo">
                    <SearchForm setCurrentDomo={setCurrentDomo}/>
                </div>
        
                <div id="domos">
                    <div>no domo yet, try searching for domos</div>
                </div>
            </div>
        );
    } else {        
        return (
            <div>
                <div id="loadDomo">
                    <SearchForm setCurrentDomo={setCurrentDomo}/>
                </div>
        
                <div id="domos">
                    <Domo domo={currentDomo}/>
                </div>
            </div>
        );
    }


    
};
    /*const [reloadDomos, setReloadDomos] = useState(false);
    const [renderDomo, setRenderDomo] = useState({});
    return(
<div>
<div id="loadDomo">
    <SearchForm triggerReload={() => setReloadDomos(!reloadDomos)} setRenderDomo={setRenderDomo}/>
        </div>
    <div id="domos">
        <DomoList domos={[]} reloadDomos={reloadDomos}/>
    </div>
            
     </div>
    );*/


const init = ()=> {
    const root = createRoot(document.getElementById('searchFor'));
    
        root.render(<App />);

};

window.onload = init;