const React = require('react')

function login()
{
    return (
        <div id="loginDiv">
            <form onSubmit={doLogin}>
                <span id="inner-title">PLEASE LOG IN</span><br/>
                <input type="text" id="loginName" placeholder="Username"/><br/>
                <input type="password" id="loginPassword" placeholder="Password"/><br/>
                <input type="submit" id="loginButton" class="buttons" value="Do It" onClick={doLogin}/>
            </form>
            <span id="loginResult"></span>
        </div>
    )
}

export default login()