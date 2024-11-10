// Imports
import React, { useState } from "react";
import './style.css'

import {Header} from "../../componentes/Header/header"
import imgBackground from "../../assets/background.png"
import RepoList from "../../componentes/RepoList/repoList"


function App (){ //obrigatorio a função iniciar Maiuscula para que useSate funcione.

    //mudando estado.
    const [user, setUser] = useState('');
    const [repos, setRepos] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    //Chamando Api
    const handleGetData = async () => {
        const userData = await fetch(`https://api.github.com/users/${user}`);
        const newUser = await userData.json();

        //verificando se name exite em newUser
        if(newUser.name){
            const {avatar_url, name, bio, login, public_repos} = newUser;
            setCurrentUser({avatar_url, name, bio, login, public_repos});

            //Chamando Api
            const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
            const newRepos = await reposData.json(); 

                if(newRepos.length){
                    setRepos(newRepos)
                }
        }

    }
    return (
    <div className="app">
        <Header />
        
        <div className="content">
           <img src={imgBackground} className="background" alt="imagem fundo" />
                <section className="infor">
                    <section>
                        <input name="user" placeholder="@username" 
                        value={user} 
                        onChange={(event) => setUser(event.target.value)} />
                        <button onClick={handleGetData}>Buscar</button>
                    </section>
 
                {currentUser?.name &&  (
                <>
                      <section className="profile">
                            <img src={currentUser.avatar_url} alt="img-user" className="profilePhoto" />
                                <div className="inforProfile">
                                    <h3>{currentUser.name}</h3>
                                    <span>{currentUser.login}</span>
                                    <br></br>
                                    <span>Total de repositórios: {currentUser.public_repos}</span>
                                    <p id="bio">Resumo:</p>
                                    <p>{currentUser.bio}</p>
                                </div>
                        </section>
                    <hr></hr>
                </>
                )}

                {repos.length ?  (
                    <section className="repos">
                        <h2>Repositórios</h2> 

                    {repos.map(rep => (
                        <RepoList title={rep.name} description={rep.description} />
                    ))}
                    </section>
                 ):null}

                </section>
                
            </div>


    </div>
        
    );
}

export default App;