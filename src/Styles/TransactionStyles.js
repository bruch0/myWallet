// import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Page = styled.main`
    width: 100%;
    height: 100vh;
    padding: 8% 0px;
    background-color: #4E007F;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
`

const Cancel = styled.button`
    width: 90%;
    height: 60px;
    padding: 0px;
    margin: 15px 0px;
    border: 0px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #8910ec;
    color: white;
    font-size: 20px;
`

export {
  Page, Cancel
}
