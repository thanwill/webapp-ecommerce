import styled from 'styled-components'

export const Section = styled.section`
    margin: 0 auto;
    margin-top: 1em;
    padding: 1em;
    background-color: #fff;
    width: 95%;
    border-radius: .5em;
    outline: .5px solid #ccc;
    
    select{
        padding: 1em;
        border-radius: .5em;
        border: 1px solid #ccc;
        margin-bottom: 1em;
        width: 100%;
        background-color: #fff;
    }

    h4{
        text-align: right;
    }

    .finish{
        background-color: green;
        padding: 1em;
        border-radius: .5em;
        color: white;
        border: none;
        width: 100%;
        transition: all .2s ease-in-out;

        &:hover{
            background-color: darkgreen;
            cursor: pointer;
        }
    }

    form{
        display: flex;
        flex-direction: column;

        input{
            padding: 1em;
            border-radius: .5em;
            border: none;
            border: 1px solid #ccc;
        }
    }
    `
export const Container = styled.div`
    margin-top: 3em;
    padding: 1em;
    margin-bottom: 5em;
`

export const ItemProduct = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 80%;
    margin: 0 auto;
    padding: 1em;
    font-size: 1.2em;
    color: #000;
    border-bottom: 1px solid #ccc;

    img{
        width: 50px;
    }

    .quantity{
        display: flex;

        button{
            border: none;
            transition: all .2s ease-in-out;
            padding: .5em;
            margin-right: .5em;
            width: 25px;
            height: 25px;
            border-radius: .5em;
            text-align: center;
        }

        .plus{
            background-color: green;
            font-weight: bold;
            color: white;
            &:hover{
                background-color: darkgreen;
            }
        }

        .minus{
            background-color: red;
            font-weight: bold;
            color: white;

            &:hover{
                background-color: darkred;
            }
        }
    }
`

export const CartDiv = styled.div`
    display: flex;
    color: #000;
`