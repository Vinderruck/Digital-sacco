import { v4 as uuidv4 } from 'uuid'; 
import express from 'express';
 import axios from 'axios'
 const router =express.Router();

  const enviromentused ='https://sandbox.momodeveloper.mtn.com';
  const tokenCreate='https://sandbox.momodeveloper.mtn.com/collection/token/';
  const requestpayment ='https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay';

  router.get('/', (req,res)=>{ res.send('Hello there!!')})
   let momoToke=null;
router.post('/Createtoken', async (req, res) => {
    try {
        
const ApiKey =process.env. ApIID;// I need to generate the api from uuidv4 and the apiikey in to basic 64 string to base 64
const Subscriptionkey = process.env.Subcriptionkeyfound; //this is just the subscription key in the profile

const getToken= await axios.post('tokenCreate',{},
    {
        header:{
            'Content-type':'application/json',
            'Ocp-Apim-Subscription-Key':  Subscriptionkey,
            Authorization:`Basic ${ApiKey}`
        },
    }
);
momoToke= getToken.data //this is noe the token generated and its the ket taht eneble us to access other API
 
res.send('we trying')
    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
        
    }



}
);


//Payment request 
router.post('/pay', async(req,res)=>{
    try {
        
   
const Phone =req.body.PhoneNumber;
const Amount =req.body.Saccopayment;

    if(!momoToke){
        res.send('Your are unable to pay reason Token isnt there')
    }
    if(!Phone){
        res.send('A phone numberis required so as to finish the transaction')
    }



     const body = {
        amount: Amount,
        currency: 'EUR',
        externalId: 'c8f060db-5126-47a7-a67b-2fee08c0f30d',
        payer: {
          partyIdType: 'MSISDN',
          partyId: 46733123454,
        },
        payerMessage: 'Payment for Sacco service',
        payeeNote: 'Payment  for Sacco service',
      };
      const Response= await axios.post(requestpayment,body,
        {
          headers: {
                                          'X-Reference-Id': 'd500af5f-01bf-4f31-8733-7bcfaac83eee',
                                          'X-Target-Environment': 'enviromentused',
                                          'Ocp-Apim-Subscription-Key':'Subcriptionkeyfound',
                                          Authorization: `Bearer ${momoToke}`,// here the created token is needed in order to initiate this
                                          'Content-Type': 'application/json',
          },
        })
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

)


 

 
  

export default router;