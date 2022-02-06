import {CreateRisk} from "../models/risk.model";

//export const URL_API = 'http://localhost:3000/api';
export const URL_API = 'https://sngrapp2022.herokuapp.com/api';
//hjkhfdfdf

export const ADMIN_CODE = "SGR_ADM";
export const TEC_CODE = "SGR_TEC";
export const USER_CODE = "SGR_USE";
export const RESPS_CODES = [
  'SGR_BOM',
  'SGR_POL',
  'SGR_FUE',
  'SGR_HOS',
  'SGR_CRU',
  'SGR_TRA'
];


export const isValidRisk = (risk: CreateRisk)=>{

  if (
    risk.canton == 0 ||
    risk.typeRisk == 0 ||
    risk.country == 0 ||
    risk.description == "" ||
    risk.email == "" ||
    risk.location == ""  ||
    risk.phoneNumber == ""  ||
    risk.province == 0 ||
    risk.zone == "" ||
    risk.location == ""
  ){
    return false;
  }
  return  true;
}

export const routes = {
  admin: ['admin/risks', 'admin/types', 'admin/origins', 'admin/levels', 'admin/units', 'risks/detail'],
  technical: ['technical/risks/register', 'technical/risks/assign', 'risks/detail'],
  unit: ['responsible/visualize', 'responsible/finalized', 'risks/detail'],
  _public: []
};
