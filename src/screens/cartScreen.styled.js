import styled from 'styled-components'

export const InputForm =  styled.form`
    text-align: center;

    
 ` 
  
 export const ValueButton =  styled.button`
    display: inline-block;
    border: 1px solid #ddd;
    margin: 0px;
    width: 20px;
    height: 3px;
    text-align: center;
    vertical-align: middle;
    padding: 11px 0;
    background: #eee;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  
  
  :hover {
    cursor: pointer;
  }
  `

   export const ValueInput = styled.input`
   width: 40px !important;
   height: 20px !important;
    #number {
    text-align: center;
    border: none;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  
  `
  
//   input[type=number]::-webkit-inner-spin-button,
//   input[type=number]::-webkit-outer-spin-button {
//       -webkit-appearance: none;
//       margin: 0;
//   }