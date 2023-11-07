import axios from "axios";
import { User } from "../models/user.model"
import bckConfig from '../config/backend.config.json';
import { UserToken } from "../models/user-token.model";
import { UserId } from "../models/user-id.model";
import { SuccessMessage } from "../models/success-message.model";
import { ErrorMessage } from "../models/error-message.model";

export class UsersService{
    public getUser(userId: string): Promise<User>{
        return new Promise<User>((resolve, reject) => {
            axios.get(`${bckConfig.server}/users/${userId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessage);
            })
        })
    }

    public registerUser(username: string, password: string): Promise<SuccessMessage>{
        return new Promise<SuccessMessage>((resolve, reject) => {
            var user = {id: '', username: username, password: password} as User;
            axios.post<SuccessMessage>(`${bckConfig.server}/users/register`, user)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessage);
            })
        })
    }

    public loginUser(username: string, password: string): Promise<UserToken>{
        return new Promise<UserToken>((resolve, reject) => {
            var user = {id: '', username: username, password: password} as User;
            axios.post<UserToken>(`${bckConfig.server}/users/login`, user)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessage);
            })
        })
    }

    public verifyToken(token: string | null): Promise<UserId>{
        return new Promise<UserId>((resolve, reject) => {
            var userToken = {token: token} as UserToken;
            axios.post(`${bckConfig.server}/users/userid`, userToken)
            .then((response) => {
                resolve(response.data as UserId);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessage);
            })
        })
    }

    public updateUser(user: User): Promise<SuccessMessage>{
        return new Promise<SuccessMessage>((resolve, reject) => {
           axios.put<SuccessMessage>(`${bckConfig.server}/users/${user.id}`, user)
           .then((response) =>{
             resolve(response.data);
           })
           .catch((error) => {
               reject(error.response.data as ErrorMessage);
           })
        })
    }

    public updatePassword(userId: string, password: string): Promise<SuccessMessage>{
        return new Promise<SuccessMessage>((resolve, reject) => {
            axios.put<SuccessMessage>(`${bckConfig.server}/users/pwd/${userId}`, {id: userId, password: password})
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessage);
            })
        })
    }

    public deleteUser(userId: string): Promise<SuccessMessage>{
        return new Promise<SuccessMessage>((resolve, reject) => {
            axios.delete<SuccessMessage>(`${bckConfig.server}/users/${userId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessage);
            })
        })
    }
}