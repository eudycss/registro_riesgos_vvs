import {RiskLevel} from "./level-risk.model";
import {RiskOrigin} from "./origin-risk.model";
import {UnnitSupport} from "./unnit-support.model";
import {Status} from "./status.model";
import {RiskType} from "./type-risk.model";
import {User} from "./user.model";

export interface Risk{
  id: number,
  code: string | null,
  description: string,
  dateNotification: Date,
  dateEnd: Date  | null,
  location: string,
  zone: string,
  latitude: string,
  longitute: string,
  username: string,
  email: string,
  phoneNumber: string,
  registered: boolean | null,
  finalized: boolean | null,
  country: Country,
  province: Province,
  canton: Canton,
  files: File[],
  historicals: RiskHistorical[],
  levelRisk: RiskLevel | null,
  origenRisk: RiskOrigin | null,
  respUnit: UnnitSupport | null,
  status: Status,
  support: UnnitSupport | null,
  typeRisk: RiskType | null,
  user: User
}

export interface CreateRisk{
  description: string,
  dateNotification: Date,
  location: string,
  zone: string,
  latitude: string,
  longitute: string,
  username: string,
  email: string,
  phoneNumber: string,
  typeRisk: number,
  country: number,
  province: number,
  canton: number
}

export interface Country{
  id: number,
  value: string,
  active: boolean
}

export interface Province extends Country{

}

export interface Canton extends Country{

}

export interface File{
  id: number,
  filename: string,
  url: string,
}

export interface RiskHistorical{
  id: number,
  dateStart: Date,
  dateEnd: Date | null,
  status: string
}




