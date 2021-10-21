import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Page = styled.main`
width: 100%;
height: 100vh;
background-color: #7d16c4;
display: flex;
flex-direction: column;
justify-content: ${props => props.isHome ? 'space-around' : 'center'};
align-items: center;
color: white;
`

const AppTitle = styled.h1`
margin-bottom: 20px;
font-family: 'Saira Stencil One', sans-serif;
font-size: 32px;
line-height: 50px;
`

const UserInput = styled.input`
width: 90%;
height: 60px;
margin: 0px 0px 13px 0px;
padding: 0px 0px 0px 10px;
border: 0px;
border-radius: 5px;
font-family: 'Raleway', sans-serif;
font-size: 20px;
pointer-events: ${props => props.loading ? 'none' : 'all'};
background-color: ${props => props.loading ? '#c8c8c8' : 'white'};

:focus {
    outline: none;
}
::placeholder {
    color: black
}
`

const TryRequest = styled.button`
width: 90%;
height: 60px;
padding: 0px;
margin: 0px;
border: 0px;
border-radius: 5px;
display: flex;
justify-content: center;
align-items: center;
background-color: #a31fff;
color: white;
font-size: 20px;
`

const ChangePage = styled(Link)`
margin-top: 50px;
color: white;
font-family: 'Raleway', sans-serif;
`

export {
  Page,
  AppTitle,
  UserInput,
  TryRequest,
  ChangePage
}
