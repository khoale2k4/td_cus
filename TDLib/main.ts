const FormData = require("form-data");
import axios, { AxiosResponse } from "axios";

export enum Role {
    CUSTOMER,
    ADMIN,
    MANAGER,
    HUMAN_RESOURCE_MANAGER,
    TELLER,
    COMPLAINTS_SOLVER,
    AGENCY_MANAGER,
    AGENCY_HUMAN_RESOURCE_MANAGER,
    AGENCY_TELLER,
    AGENCY_COMPLAINTS_SOLVER,
    SHIPPER,
    DRIVER,
    TRANSPORT_PARTNER_REPRESENTOR
};

export interface SendingOtp {
    phoneNumber: String,
    email: String,
}

export interface VerifyingOtp {
    id: String,
    otp: String,
}

export interface RegisteringPayload {
    username: string,
    password: string,
    email: string,
    phoneNumber: string,
    role: Role
}

export interface LoginPayload {
    username: string,
    password: string,
}

export enum LoginOption {
    BUSINESS = "BUSINESS",
    STAFF = "STAFF",
    CUSTOMER = "CUSTOMER"
}

// const host = "http://localhost:3000/v3";
const host = "https://api.tdlogistics.net.vn/v3";

export class AuthOperation {
    private baseUrl: String;

    constructor() {
        this.baseUrl = host + "/auth";
    }

    async sendOtp(payload: SendingOtp) {
        try {
            const response = await axios.post(`${this.baseUrl}/customer/login`, payload);
            return { error: response.data.error, message: response.data.message, data: response.data.data };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Error sending otp: ", error.response?.data);
            } else {
                console.log("Error sending otp: ", error);
            }
            console.error("Request that caused the error: ", (error as any)?.request);
            return { error: (error as any)?.response?.data, request: (error as any)?.request, status: (error as any).response ? (error as any).response.status : null };
        }
    }

    async verifyOtp(payload: VerifyingOtp) {
        try {
            const response = await axios.post(`${this.baseUrl}/otp/verify`, payload, {
                withCredentials: true
            });
            return { error: response.data.error, message: response.data.message, data: response.data.data };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Error sending otp: ", error.response?.data);
            } else {
                console.log("Error sending otp: ", error);
            }
            console.error("Request that caused the error: ", (error as any)?.request);
            return { error: (error as any)?.response?.data, request: (error as any)?.request, status: (error as any).response ? (error as any).response.status : null };
        }
    }

    async register(payload: RegisteringPayload) {
        try {
            const response = await axios.post(`${this.baseUrl}/basic/register`, payload, {
                withCredentials: true
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Error sending otp: ", error.response?.data);
            } else {
                console.log("Error sending otp: ", error);
            }
            console.error("Request that caused the error: ", (error as any)?.request);
            return { error: (error as any)?.response?.data, request: (error as any)?.request, status: (error as any).response ? (error as any).response.status : null };
        }
    }

    async login(payload: LoginPayload, loginOption: LoginOption) {
        try {
            const response = await axios.post(`${this.baseUrl}/basic/login?option=${loginOption}`, payload, {
                withCredentials: true
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Error sending otp: ", error.response?.data);
            } else {
                console.log("Error sending otp: ", error);
            }
            console.error("Request that caused the error: ", (error as any)?.request);
            return { error: (error as any)?.response?.data, request: (error as any)?.request, status: (error as any).response ? (error as any).response.status : null };
        }
    }
}

export interface AssignBusinessToAgencyDto {
    businessId: string;
    agencyId: string;
}

export interface CreateBusiness {
    // Business Representor
    // userFullname: string;
    // userPhoneNumber: string;
    // userEmail: string;
    // userDateOfBirth: Date;
    // userCccd: string;
    // userProvince: string;
    // userDistrict: string;
    // userTown: string;
    // userDetailAddress: string;
    // userBin: string;
    // userBank: string;
    // username: string;
    // password: string;

    // Business information
    // Created by admin needs agencyId, while agency does not
    // agencyId?: string; // Optional if only needed by admin
    // businessName: string;
    // email: string;
    // phoneNumber: string;
    name: string;
    taxCode: string;
    province: string;
    district: string;
    town: string;
    address?: string;
    // bin: string;
    // bank: string;
}

export interface BusinessUser {
    // Identifiers
    uuid?: string;
    businessId?: string;
    agencyId?: string;

    // Business Information
    businessName?: string;
    taxNumber?: string;
    province?: string;
    district?: string;
    town?: string;
    detailAddress?: string;
    bin?: string;
    bank?: string;

    // Other Fields
    debit?: number;
    active?: boolean;
    approved?: boolean;
    representor?: BusinessRepresentor;
}


export interface BusinessRepresentor {
    id?: number;
    businessId?: string;
    uuid?: string;
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    dateOfBirth?: Date;
    cccd?: string;
    province?: string;
    district?: string;
    town?: string;
    detailAddress?: string;
    bin?: string;
    bank?: string;
    businessUser?: BusinessUser;
}

export interface BusinessId {
    businessId: String;
}

export interface GetLicenseFileDto {
    fileId: String;
}

export class BusinessOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${host}/business`;
    }

    async signUp(payload: CreateBusiness, imageFile: File | Blob, token: string) {
        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(payload));

            formData.append("file", imageFile);

            const response = await axios.post(`${this.baseUrl}/signup`, formData, {
                withCredentials: true,
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data"
                }
            });

            return response.data;
        } catch (error) {
            console.error("Error signing up business:", error);
            return this.handleError(error);
        }
    }

    async update(id: string, payload: CreateBusiness, imageFile: File | Blob, token: string) {
        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(payload));

            formData.append("file", imageFile);

            const response = await axios.post(`${this.baseUrl}/update/${id}`, formData, {
                withCredentials: true,
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data"
                }
            });

            return response.data;
        } catch (error) {
            console.error("Error signing up business:", error);
            return this.handleError(error);
        }
    }


    async searchBusinesses(payload: SearchPayload, token: string) {
        try {
            const response = await axios.post(`${this.baseUrl}/search`, payload, {
                withCredentials: true,
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error searching businesses:", error);
            return this.handleError(error);
        }
    }

    async assignToAgency(payload: AssignBusinessToAgencyDto) {
        try {
            const response = await axios.post(`${this.baseUrl}/agency/assign`, payload, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error("Error assigning business to agency:", error);
            return this.handleError(error);
        }
    }

    async getLicenseFile(payload: GetLicenseFileDto, token: string): Promise<Blob | null> {
        try {
            const response = await axios.get(`${this.baseUrl}/license/download/${payload.fileId}`, {
                withCredentials: true,
                headers: {
                    Authorization: "Bearer " + token
                },
                responseType: "blob"
            });

            if (response.data instanceof Blob) {
                return response.data;
            } else {
                console.error("Response is not a Blob:", response.data);
                return null;
            }
        } catch (error) {
            console.error("Error getting business license:", error);
            return null;
        }
    }


    private handleError(error: any) {
        return {
            error: error.response?.data || error.message,
            request: error.request,
            status: error.response ? error.response.status : null
        };
    }
}

export interface UpdateAccountPayload {
    phoneNumber?: string,
    email?: string
}

export interface UpdatePasswordPayload {
    password: string,
    newPassword: string
}

export interface SearchAccountCriteria {
    id?: string,
    username?: string,
    phoneNumber?: string,
    email?: string,
    role?: Role,
    active?: boolean
}

export class AccountOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = host + "/accounts";
    }

    async updateInfo(accountId: string, payload: UpdateAccountPayload) {
        try {
            const response = await axios.put(`${this.baseUrl}/update?accountId=${accountId}`, payload, {
                withCredentials: true
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Error sending otp: ", error.response?.data);
            } else {
                console.log("Error sending otp: ", error);
            }
            console.error("Request that caused the error: ", (error as any)?.request);
            return { error: (error as any)?.response?.data, request: (error as any)?.request, status: (error as any).response ? (error as any).response.status : null };
        }
    }

    async updatePassword(payload: UpdatePasswordPayload) {
        try {
            const response = await axios.put(`${this.baseUrl}/password`, payload, {
                withCredentials: true
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Error sending otp: ", error.response?.data);
            } else {
                console.log("Error sending otp: ", error);
            }
            console.error("Request that caused the error: ", (error as any)?.request);
            return { error: (error as any)?.response?.data, request: (error as any)?.request, status: (error as any).response ? (error as any).response.status : null };
        }
    }

    async search(criteria: SearchAccountCriteria) {
        try {
            const response = await axios.post(`${this.baseUrl}/search`, criteria, {
                withCredentials: true
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Error sending otp: ", error.response?.data);
            } else {
                console.log("Error sending otp: ", error);
            }
            console.error("Request that caused the error: ", (error as any)?.request);
            return { error: (error as any)?.response?.data, request: (error as any)?.request, status: (error as any).response ? (error as any).response.status : null };
        }
    }
}

interface UpdatingCustomerParams {
    customerId: String,
}

interface UpdatingCustomerPayload {
    fullname?: String,
    province?: String,
    district?: String,
    ward?: String,
    detailAddress?: String,
}

interface SearchingCustomerPayload {
    fullname?: String,
    province?: String,
    district?: String,
    ward?: String,
    detailAddress?: String,
}

interface UpdatingAvatarPayload {
    avatar: File
}

interface GettingAvatarParams {
    customerId: String
}

export class CustomerOperation {
    private baseUrl: String;

    constructor() {
        this.baseUrl = host + "/customer";
    }

    async getAuthenticatedCustomerInfo(token: string) {
        try {
            const response = await axios.get(`${this.baseUrl}/`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return { error: response.data.error, message: response.data.message, data: response.data.data };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Error getting authenticated customer info: ", error.response?.data);
                console.error("Request that caused the error: ", error.request);
                return { error: error.response?.data, request: error.request, status: error.response ? error.response.status : null };
            } else {
                console.log("Error getting authenticated customer info: ", error);
                return { error: error, request: null, status: null };
            }
        }
    }

    async updateInfo(params: UpdatingCustomerParams, payload: UpdatingCustomerPayload) {
        try {
            const response = await axios.put(`${this.baseUrl}/update?customerId=${params.customerId}`, payload, {
                withCredentials: true
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Error sending otp: ", error.response?.data);
            } else {
                console.log("Error sending otp: ", error);
            }
            console.error("Request that caused the error: ", (error as any)?.request);
            return { error: (error as any)?.response?.data, request: (error as any)?.request, status: (error as any).response ? (error as any).response.status : null };
        }
    }

    async search(payload: SearchingCustomerPayload) {
        try {
            const response = await axios.post(`${this.baseUrl}/search`, payload, {
                withCredentials: true
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Error sending otp: ", error.response?.data);
            } else {
                console.log("Error sending otp: ", error);
            }
            console.error("Request that caused the error: ", (error as any)?.request);
            return { error: (error as any)?.response?.data, request: (error as any)?.request, status: (error as any).response ? (error as any).response.status : null };
        }
    }

    async updateAvatar(payload: UpdatingAvatarPayload) {
        try {
            const formData = new FormData();
            formData.append('avatar', payload.avatar);

            const response = await axios.put(`${this.baseUrl}/avatar/update`, formData, {
                withCredentials: true
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Error sending otp: ", error.response?.data);
            } else {
                console.log("Error sending otp: ", error);
            }
            console.error("Request that caused the error: ", (error as any)?.request);
            return { error: (error as any)?.response?.data, request: (error as any)?.request, status: (error as any).response ? (error as any).response.status : null };
        }
    }

    async getAvatar(params: GettingAvatarParams) {
        try {
            const response = await axios.get(`${this.baseUrl}/avatar/get?customerId=${params.customerId}`, {
                withCredentials: true
            });

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Error sending otp: ", error.response?.data);
            } else {
                console.log("Error sending otp: ", error);
            }
            console.error("Request that caused the error: ", (error as any)?.request);
            return { error: (error as any)?.response?.data, request: (error as any)?.request, status: (error as any).response ? (error as any).response.status : null };
        }
    }
}

export interface CreateShippingBillDto {
    companyName: string;
    companyAddress: string;
    taxCode: string;
    email: string;
}

export class ShippingBillOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = host + '/shipping_bill';
    }

    async create(dto: CreateShippingBillDto, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, dto, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error creating shipping bill: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    async getByCustomerId(customerId: string, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/customer/get`, {
                params: { customerId },
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error fetching shipping bill by customer: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    async search(payload: SearchPayload, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error searching shipping bills: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }
}

export interface CreateGiftOrderTopicDto {
    name: string;
}

export class GiftOrderTopicOperation {
    private baseUrl: string;
    constructor() {
        this.baseUrl = host + '/gift_order_topic';
    }

    // ADMIN
    async create(payload: CreateGiftOrderTopicDto, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async findAll(token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/get`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        }
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

}

export interface ImageChangeStatusDto {
    id: string;
    isChanged: boolean;
}

export interface UpdateCargoInsuranceDto {
    note: string;
    hasDeliveryCare: boolean;
    shippingBillId: string;
    areImagesChanged: ImageChangeStatusDto[];
}

export interface CreateCargoInsuranceDto {
    note: string;
    hasDeliveryCare: boolean;
    shippingBillId: string;
}

export class CargoInsuranceOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = host + '/cargo_insurance';
    }

    async getByCustomerId(orderId: string, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/order/get/${orderId}`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error fetching cargo insurance: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    async update(updateDto: UpdateCargoInsuranceDto, id: string, token: string, files?: File[]) {
        try {
            const formData = new FormData();

            // Append all fields from updateDto to formData
            Object.keys(updateDto).forEach((key) => {
                formData.append(key, (updateDto as any)[key]);
            });

            // If there are files, append them to formData
            if (files && files.length > 0) {
                files.forEach((file) => formData.append("file", file));
            }

            const response: AxiosResponse = await axios.put(`${this.baseUrl}/update/${id}`, formData, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error updating cargo insurance: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }

    async create(payload: CreateCargoInsuranceDto, orderId: string, token: string, files?: File[]) {
        try {
            const formData = new FormData();

            // Append all fields from payload to formData
            Object.keys(payload).forEach((key) => {
                formData.append(key, (payload as any)[key]);
            });

            // If there are files, append them to formData
            if (files && files.length > 0) {
                files.forEach((file) => formData.append("file", file));
            }

            const response: AxiosResponse = await axios.post(`${this.baseUrl}/create/${orderId}`, formData, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error creating cargo insurance: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }
}

export class MapOperation {
    async getCoordinates(address: string, ggmapkey: string): Promise<{ lat: number; lng: number } | null> {
        try {
            const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
                params: {
                    address,
                    key: ggmapkey,
                },
            });

            if (response.data.status === "OK") {
                const location = response.data.results[0].geometry.location;
                return { lat: location.lat, lng: location.lng };
            } else {
                console.error("Lỗi khi lấy tọa độ:", response.data.status);
                return null;
            }
        } catch (error) {
            console.error("Lỗi API Google Geocoding:", error);
            return null;
        }
    }
}

export interface CheckingExistOrderCriteria {
    orderId: string,
}

export interface GettingOrdersCriteria {
    orderId: string,
    nameReceiver?: string,
    phoneReceiver?: string,
    provinceSource?: string,
    districtSource?: string,
    wardSource?: string,
    provinceDest?: string,
    districtDest?: string,
    wardDest?: string,
    serviceType?: string,
}

export interface SearchPayload {
    criteria: SearchCriteria[],
    addition: SearchAddition
}

export interface SearchAddition {
    sort: [string, 'ASC' | 'DESC'][],
    page: number,
    size: number,
    group: string[]
}

export interface SearchCriteria {
    field: string;
    operator: '~' | '!~' | '=' | '!=' | 'isSet' | 'isNotSet' | '<' | '<=' | '>' | '>=';
    value?: any;
}

export interface CreatingOrderByUserInformation {
    nameSender: string,
    phoneNumberSender?: string,
    nameReceiver: string,
    phoneNumberReceiver: string,
    mass: number,
    height: number,
    width: number,
    length: number,
    provinceSource: string,
    districtSource: string,
    wardSource: string,
    detailSource: string,
    provinceDest: string,
    districtDest: string,
    wardDest: string,
    detailDest: string,
    longSource: number,
    latSource: number,
    longDestination: number,
    latDestination: number,
    cod: number,
    serviceType: string,
}


export interface OrderDTO {
    nameSender: string;
    phoneNumberSender: string;
    nameReceiver: string;
    phoneNumberReceiver: string;
    fromMass: number;
    toMass: number;
    mass: number;
    height: number;
    width: number;
    length: number;
    provinceSource: string;
    districtSource: string;
    wardSource: string;
    detailSource: string;
    provinceDest: string;
    districtDest: string;
    wardDest: string;
    detailDest: string;
    longSource: number;
    latSource: number;
    longDestination: number;
    latDestination: number;
    cod: number;
    serviceType: string;
    goodType: string;
    receiverWillPay: boolean;
    deliverDoorToDoor: boolean;
    isBulkyGood: boolean;
    note: string;
    paymentMethod: 'BY_CASH' | 'BY_BANK_TRANSFER';
    willExportInvoice: boolean;
}



export interface CreatingOrderByAdminAndAgencyInformation {
    nameSender: string,
    phoneNumberSender: string,
    nameReceiver: string,
    phoneNumberReceiver: string,
    mass: number,
    height: number,
    width: number,
    length: number,
    provinceSource: string,
    districtSource: string,
    wardSource: string,
    detailSource: string,
    provinceDest: string,
    districtDest: string,
    wardDest: string,
    detailDest: string,
    longSource: number,
    latSource: number,
    longDestination: number,
    latDestination: number,
    cod: number,
    serviceType: string,
}


export interface UpdatingOrderCriteria {
    orderId: string,
}

export interface UpdatingOrderPayload {
    mass?: number,
    height?: number,
    width?: number,
    length?: number,
    COD?: number,
    statusCode?: number,
}

export interface CancelingOrderCriteria {
    orderId: string,
}

export interface CalculateFeePayload {
    serviceType: string;
    cod: number;
    provinceSource: string;
    provinceDest: string;
    latSource: number;
    longSource: number;
    latDestination: number;
    longDestination: number;
    voucherId: string | null;
    mass: number;
}

export interface UpdatingOrderImageParams {
    orderId: string,
    taskId: string,
    type: string, // just "send" and "receive" are valid
}

export interface UpdatingOrderImagesPayload {
    image: File[],
}

export interface UpdatingOrderSignatureParams {
    orderId: string,
    taskId: string,
    type: string, // just "send" and "receive" are valid
}

export interface GettingOrderImageParams {
    orderId: string,
    type: string, // just "send" and "receive" are valid
}

export interface GettingOrderSignatureParams {
    orderId: string,
    type: string, // just "send" and "receive" are valid
}

export interface UpdatingOrderSignaturePayload {
    image: File
}

export class OrdersOperation {
    private baseUrl: string;
    constructor() {
        this.baseUrl = host + "/order";
    }

    async create(payload: OrderDTO, token: string) {
        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(payload));

            const response = await axios.post(`${this.baseUrl}/create`, formData, {
                withCredentials: true,
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data",
                },
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        } catch (error: any) {
            console.log("Error creating agency: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                error: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }


    async get(payload: SearchPayload, token: String) {
        try {
            const response = await axios.post(`${this.baseUrl}/search`, payload, {
                withCredentials: true,
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            return { error: response.data.error, data: response.data.data, message: response.data.message };
        } catch (error: any) {
            console.log("Error getting orders: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async checkExist(params: CheckingExistOrderCriteria) {
        try {
            const response = await axios.get(`${this.baseUrl}/check?orderId=${params.orderId}`, {
                withCredentials: true,
            });

            return { error: response.data.error, exist: response.data.existed, message: response.data.message };
        } catch (error: any) {
            console.log("Error checking exist order: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async update(payload: UpdatingOrderPayload, params: UpdatingOrderCriteria) {
        try {
            const response = await axios.put(`${this.baseUrl}/update?orderId=${params.orderId}`, payload, {
                withCredentials: true,
            });

            return { error: response.data.error, data: response.data.data, message: response.data.message };
        } catch (error: any) {
            console.log("Error updating order: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async cancel(params: CancelingOrderCriteria) {
        try {
            const response = await axios.delete(`${this.baseUrl}/cancel?orderId=${params.orderId}`, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message };
        } catch (error: any) {
            console.log("Error canceling order: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }


    async getShipperWhoTakenOrder(id: string, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/shipper/get/${id}`, {
                withCredentials: true,
                validateStatus: (status) => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status,
            };
        } catch (error: any) {
            console.log("Error getting shipper who taken order: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                success: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null,
            };
        }
    }

    async calculateFee(payload: CalculateFeePayload, token: string) {
        try {
            const response = await axios.post(`${this.baseUrl}/fee/calculate`, payload, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        } catch (error: any) {
            console.log("Error calculating fee: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async updateImages(payload: UpdatingOrderImagesPayload, params: UpdatingOrderImageParams) {
        try {
            let formData: FormData = new FormData();
            for (let i = 0; i < payload.image.length; i++) {
                formData.append("image", payload.image[i]);
            }

            const response = await axios.put(`${this.baseUrl}/image/update?orderId=${params.orderId}&taskId=${params.taskId}&type=${params.type}`, formData, {
                withCredentials: true,
            });

            return { error: response.data.error, data: response.data.data, message: response.data.message };
        } catch (error: any) {
            console.log("Error updating order images: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async updateSignature(payload: UpdatingOrderSignaturePayload, params: UpdatingOrderImageParams) {
        try {
            let formData: FormData = new FormData();
            formData.append("image", payload.image);

            const response = await axios.put(`${this.baseUrl}/signature/update?orderId=${params.orderId}&taskId=${params.taskId}&type=${params.type}`, formData, {
                withCredentials: true,
            });

            return { error: response.data.error, data: response.data.data, message: response.data.message };
        } catch (error: any) {
            console.log("Error updating order images: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async getImages(orderId: string) {
        try {
            const response = await axios.get(`${this.baseUrl}/image/download?${orderId}`, {
                withCredentials: true,
            });

            return response.data;
        } catch (error: any) {
            console.log("Error getting order image: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async getSignature(params: GettingOrderImageParams) {
        try {
            const response = await axios.get(`${this.baseUrl}/signature/get?orderId=${params.orderId}&type=${params.type}`, {
                withCredentials: true,
            });

            return response.data;
        } catch (error: any) {
            console.log("Error getting order signature: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async getOrderJourney(id: string, token: string) {
        try {
            const response = await axios.get(`${this.baseUrl}/shipper/current_journey/${id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return { error: response.data.error, data: response.data.data, message: response.data.message };
        } catch (error: any) {
            console.log("Error getting order journey: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }
}


export class InvoiceOperation {
    private baseUrl: string;
    constructor() {
        this.baseUrl = host + "/invoices";
    }

    async getByOrderId(orderId: string, token: string) {
        try {
            const response = await axios.get(`${this.baseUrl}/order/${orderId}`, {
                withCredentials: true,
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        } catch (error: any) {
            console.log("Error getting invoice: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {
                error: error?.response?.data,
                request: error?.request,
                status: error.response ? error.response.status : null
            };
        }
    }
}


export interface AdministrativePayload {
    province?: string,
    district?: string,
    ward?: string
}

export class AdministrativeOperation {
    private baseUrl: string;
    constructor() {
        // this.baseUrl = host + "/administrative";
        this.baseUrl = "https://api.tdlogistics.net.vn/v3/administrative";
    }

    async get(conditions: AdministrativePayload) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, conditions, {
                withCredentials: true
            });

            return { error: response.data.error, data: response.data.data, message: response.data.message }
        } catch (error: any) {
            console.error("Error getting administrative: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }
}

export interface CreatingStaffByAgencyPayload {
    account: {
        id: string
    },
    fullname: string,
    dateOfBirth: string,
    cccd: string,
    role: Role,
    position: string,
    salary: number,
    paidSalary: number,
    province: string,
    district: string,
    town: string,
    detailAddress: string,
    managedWards?: Array<String>
}

export interface CreatingStaffByAdminPayload {
    account: {
        id: string
    },
    agencyId: string,
    fullname: string,
    dateOfBirth: string,
    cccd: string,
    role: Role,
    position: string,
    salary: number,
    paidSalary: number,
    province: string,
    district: string,
    town: string,
    detailAddress: string,
    managedWards?: Array<String>
}

export interface FindingStaffByStaffCriteria {
    staffId: string,
}

export interface FindingStaffByAdminCriteria {
    agencyId?: string,
    staffId?: string,
    fullname?: string,
    dateOfBirth?: string,
    cccd?: string,
    role?: Role,
    province?: string,
    district?: string,
    town?: string,
}

export interface FindingStaffByAgencyCriteria {
    staffId?: string,
    fullname?: string,
    dateOfBirth?: string,
    cccd?: string,
    role?: Role,
    province?: string,
    district?: string,
    town?: string,
}

export interface UpdatingStaffPayload {
    fullname?: string,
    username?: string,
    dateOfBirth?: string,
    role?: Role,
    position?: string,
    salary?: number,
    paidSalary?: number,
    province?: string,
    district?: string,
    town?: string,
    detailAddress?: string,
    managedWards?: Array<String>
}

export interface UpdatingStaffCriteria {
    staffId: string,
}

export interface DeletingStaffCriteria {
    staffId: string,
};

export interface UpdatingAvatarStaffPayload {
    avatar: File,
};

export interface FindingAvatarCriteria {
    staffId: string,
}

export class StaffOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = host + "/staffs";
    }

    // ROLE: any
    async getAuthenticatedStaffInfo() {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/`, {
                withCredentials: true,
            });

            return { error: response.data.error, data: response.data.data, message: response.data.message };
        } catch (error: any) {
            console.log("Error get authenticated staff information: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: ADMIN, TELLER, HUMAN_RESOURCE_MANAGER, COMPLAINTS_SOLVER
    async findByAdmin(conditions: FindingStaffByAdminCriteria) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, conditions, {
                withCredentials: true,
            });

            return { error: response.data.error, data: response.data.data, message: response.data.message };
        }
        catch (error: any) {
            console.log("Error getting staffs: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: ADMIN, TELLER, HUMAN_RESOURCE_MANAGER, COMPLAINTS_SOLVER
    async findByAgency(conditions: FindingStaffByAgencyCriteria) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, conditions, {
                withCredentials: true,
            });

            return { error: response.data.error, data: response.data.data, message: response.data.message };
        }
        catch (error: any) {
            console.log("Error getting staffs: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER
    async createByAdmin(info: CreatingStaffByAdminPayload) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, info, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error create new staff: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    async createByAgency(info: CreatingStaffByAgencyPayload) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, info, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error create new staff: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    async update(info: UpdatingStaffPayload, condition: UpdatingStaffCriteria) {
        try {
            const response: AxiosResponse = await axios.put(`${this.baseUrl}/update?staffId=${condition.staffId}`, info, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error create new staff: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async getManagedWards(staffId: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/managed_wards/get?staffId=${staffId}`, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error getting managed wards: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    async deleteStaff(condition: DeletingStaffCriteria) {
        try {
            const response = await axios.delete(`${this.baseUrl}/delete?staffId=${condition.staffId}`, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error deleting staff: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    async updateAvatar(info: UpdatingAvatarStaffPayload, condition: UpdatingStaffCriteria) {
        try {
            const formData = new FormData();
            formData.append('avatar', info.avatar);

            const response: AxiosResponse = await axios.put(`${this.baseUrl}/avatar/update?staffId=${condition.staffId}`, formData, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        } catch (error: any) {
            console.error('Error uploading image:', error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null }; // Ném lỗi để xử lý bên ngoài
        }
    }

    // ROLE: any
    async getAvatar(condition: FindingAvatarCriteria) {
        try {
            const response = await axios.get(`${this.baseUrl}/avatar/get?staffId=${condition.staffId}`, {
                withCredentials: true,
                responseType: 'arraybuffer',
            });

            return response.data;
        } catch (error: any) {
            console.error("Error getting avatar: ", error);
            return error.response.data;
        }
    }
}

export interface CreatingTransportPartnerStaffByAdminPayload {
    account: {
        id: string
    },
    partnerId: string,
    agencyId: string,
    fullname: string,
    dateOfBirth?: string,
    cccd: string,
    province?: string,
    district?: string,
    town?: string,
    detailAddress?: string,
    position?: string,
    bin?: string,
    bank?: string
}

export interface CreatingTransportPartnerStaffByAgencyPayload {
    account: {
        id: string
    },
    partnerId: string,
    fullname: string,
    dateOfBirth?: string,
    cccd: string,
    province?: string,
    district?: string,
    town?: string,
    detailAddress?: string,
    position?: string,
    bin?: string,
    bank?: string
}

export interface SearchingTransportPartnerStaffByAdminCriteria {
    agencyId: string,
    partnerId: string,
    staffId?: string,
    fullname: string,
    dateOfBirth?: string,
    cccd: string,
    province?: string,
    district?: string,
    town?: string,
    detailAddress?: string,
    position?: string,
    bin?: string,
    bank?: string
}

export interface SearchingTransportPartnerStaffByAgencyCriteria {
    partnerId: string,
    staffId?: string,
    fullname: string,
    dateOfBirth?: string,
    cccd: string,
    province?: string,
    district?: string,
    town?: string,
    detailAddress?: string,
    position?: string,
    bin?: string,
    bank?: string
}

export interface UpdatingTransportPartnerStaffParams {
    staffId: string
}

export interface UpdatingTransportPartnerStaffPayload {
    fullname: string,
    dateOfBirth?: string,
    province?: string,
    district?: string,
    town?: string,
    detailAddress?: string,
    position?: string,
    bin?: string,
    bank?: string
}

export interface DeletingTransportPartnerStaffParams {
    staffId: string
}

export class TransportPartnerStaffOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = host + "/partner_staffs";
    }

    async getAuthenticatedStaffInfo() {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/`, {
                withCredentials: true,
            });

            return { error: response.data.error, data: response.data.data, message: response.data.message };
        } catch (error: any) {
            console.log("Error get authenticated staff information: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }


    async createByAdmin(payload: CreatingTransportPartnerStaffByAdminPayload) {
        try {
            const response = await axios.post(`${this.baseUrl}/create`, payload, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error creating partner staff: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async createByAgency(payload: CreatingTransportPartnerStaffByAgencyPayload) {
        try {
            const response = await axios.post(`${this.baseUrl}/create`, payload, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error creating partner staff: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async searchByAdmin(criteria: SearchingTransportPartnerStaffByAdminCriteria) {
        try {
            const response = await axios.post(`${this.baseUrl}/search`, criteria, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error searching partner staff: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async searchByAgency(criteria: SearchingTransportPartnerStaffByAgencyCriteria) {
        try {
            const response = await axios.post(`${this.baseUrl}/search`, criteria, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error searching partner staff: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async update(params: UpdatingTransportPartnerStaffParams, payload: UpdatingTransportPartnerStaffPayload) {
        try {
            const response = await axios.put(`${this.baseUrl}/update?staffId=${params.staffId}`, payload, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error updating partner staff: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async deleteStaff(params: DeletingTransportPartnerStaffParams) {
        try {
            const response = await axios.delete(`${this.baseUrl}/delete?staffId=${params.staffId}`, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error deleting partner staff: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }
}

export interface CreatingTransportPartnerByAdminPayload {
    agencyId: string,
    transportPartnerName: string,
    province?: string,
    district?: string,
    town?: string;
    detailAddress?: string,
    taxCode: string
    phoneNumber: string,
    email: string,
    bin?: string,
    bank?: string,
    debit?: number,
    representor: {
        cccd: string,
        dateOfBirth?: string,
        province?: string,
        district?: string,
        town?: string,
        detailAddress?: string,
        position?: string,
        bin?: string,
        bank?: string,
        account: {
            phoneNumber: string,
            email: string
        }
    }
}

export interface CreatingTransportPartnerByAgencyPayload {
    transportPartnerName: string,
    province?: string,
    district?: string,
    town?: string;
    detailAddress?: string,
    taxCode: string
    phoneNumber: string,
    email: string,
    bin?: string,
    bank?: string,
    debit?: number,
    representor: {
        cccd: string,
        dateOfBirth?: string,
        province?: string,
        district?: string,
        town?: string,
        detailAddress?: string,
        position?: string,
        bin?: string,
        bank?: string,
        account: {
            phoneNumber: string,
            email: string
        }
    }
}

export interface SearchingTransportPartnerByAdminCriteria {
    agencyId?: string,
    transportPartnerId?: string,
    transportPartnerName?: string,
    province?: string,
    district?: string,
    town?: string;
    detailAddress?: string,
    taxCode?: string
    phoneNumber?: string,
    email?: string,
    bin?: string,
    bank?: string,
    debit?: number,
}

export interface SearchingTransportPartnerByAgencyCriteria {
    transportPartnerId?: string,
    transportPartnerName?: string,
    province?: string,
    district?: string,
    town?: string;
    detailAddress?: string,
    taxCode?: string
    phoneNumber?: string,
    email?: string,
    bin?: string,
    bank?: string,
    debit?: number,
}

export interface UpdatingTransportPartnerParams {
    transportPartnerId: string
}




export interface DeletingTransportPartnerParams {
    transportPartnerId: string
}

export class TransportPartnerOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = host + "/transport_partners";
    }

    async createByAdmin(payload: CreatingTransportPartnerByAdminPayload) {
        try {
            const response = await axios.post(`${this.baseUrl}/create`, payload, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error creating transport partner: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async createByAgency(payload: CreatingTransportPartnerByAgencyPayload) {
        try {
            const response = await axios.post(`${this.baseUrl}/create`, payload, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error creating transport partner: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async searchByAdmin(criteria: SearchingTransportPartnerByAdminCriteria) {
        try {
            const response = await axios.post(`${this.baseUrl}/search`, criteria, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error searching transport partner: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async searchByAgency(criteria: SearchingTransportPartnerByAgencyCriteria) {
        try {
            const response = await axios.post(`${this.baseUrl}/search`, criteria, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error searching transport partner: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async update(params: UpdatingTransportPartnerParams, payload: UpdatingTransportPartnerStaffPayload) {
        try {
            const response = await axios.put(`${this.baseUrl}/update?transportPartnerId=${params.transportPartnerId}`, payload, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error updating transport partner: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async deleteTransportPartner(params: DeletingTransportPartnerParams) {
        try {
            const response = await axios.delete(`${this.baseUrl}/delete?transportPartnerId=${params.transportPartnerId}`, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error deleting transport partner: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }
}

export interface CreatingVehicleByAdminPayload {
    transportPartnerId?: string,
    agencyId: string,
    staffId: string,
    type: string,
    licensePlate: string,
    maxLoad: number
}

export interface CreatingVehicleByAgencyPayload {
    transportPartnerId?: string,
    staffId: string,
    type: string,
    licensePlate: string,
    maxLoad: number
}

export interface SearchingVehicleByAdminCriteria {
    transportPartnerId?: string,
    staffId?: string,
    type?: string,
    vehicleId?: string,
    licensePlate?: string,
    maxLoad?: number
}

export interface SearchingVehicleByAgencyCriteria {
    transportPartnerId?: string,
    agencyId?: string,
    staffId?: string,
    type?: string,
    vehicleId?: string,
    licensePlate?: string,
    maxLoad?: number
}

export interface UpdatingVehicleParams {
    vehicleId: string
}

export interface UpdatingVehiclePayload {
    type?: string,
    maxLoad?: number
}

export interface DeletingVehicleParams {
    vehicleId: string
}

export interface ShipmentIds {
    shipmentIds: string[];
}

export class VehicleOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = host + "/vehicles";
    }

    async createByAdmin(payload: CreatingVehicleByAdminPayload) {
        try {
            const response = await axios.post(`${this.baseUrl}/create`, payload, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error creating vehicle: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async createByAgency(payload: CreatingVehicleByAgencyPayload) {
        try {
            const response = await axios.post(`${this.baseUrl}/create`, payload, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error creating vehicle: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async searchByAdmin(criteria: SearchingVehicleByAdminCriteria) {
        try {
            const response = await axios.post(`${this.baseUrl}/search`, criteria, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error searching vehicle: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async searchByAgency(criteria: SearchingVehicleByAgencyCriteria) {
        try {
            const response = await axios.post(`${this.baseUrl}/search`, criteria, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error searching vehicle: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async update(params: UpdatingVehicleParams, payload: UpdatingVehiclePayload) {
        try {
            const response = await axios.post(`${this.baseUrl}/update?vehicleId=${params.vehicleId}`, payload, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error updating vehicle: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async deleteVehicle(params: DeletingVehicleParams) {
        try {
            const response = await axios.delete(`${this.baseUrl}/delete?vehicleId=${params.vehicleId}`, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error deleting vehicle: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async addShipments(vehicleId: string, payload: ShipmentIds) {
        try {
            const response = await axios.post(`${this.baseUrl}/shipments/add?vehicleId=${vehicleId}`, payload, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error adding shipments to vehicle: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async removeShipments(vehicleId: string, payload: ShipmentIds) {
        try {
            const response = await axios.post(`${this.baseUrl}/shipments/delete?vehicleId=${vehicleId}`, payload, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error removing shipments from vehicle: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async undertakeShiment(shipmentId: string) {
        try {
            const response = await axios.get(`${this.baseUrl}/shipments/undertake?shipmentId=${shipmentId}`, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error undertaking shipment: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }
}

export enum AgencyType {
    BC, DL, TD
}

export interface CreatingAgencyPayload {
    agencyAdmin: {
        fullname: string,
        phoneNumber: string,
        email: string,
        dateOfBirth?: string,
        cccd: string,
        province?: string,
        district?: string,
        town?: string,
        detailAddress?: string,
        position?: string,
        salary?: number,
        bin?: string,
        bank?: string
    },
    type: AgencyType,
    level: number,
    postalCode: string,
    agencyName: string,
    province: string,
    district: string,
    town: string,
    detailAddress: string,
    latitude?: number,
    longitude?: number,
    managedWards?: string[],
    phoneNumber: string,
    email: string,
    commissionRate?: number,
    bin?: string,
    bank?: string,
    individualCompany: boolean,
    agencyCompany?: {
        companyName: string,
        taxNumber: string
    }
}

export interface SearchingAgencyCriteria {
    agencyId?: string,
    type?: AgencyType,
    level?: number,
    postalCode?: string,
    agencyName?: string,
    province?: string,
    district?: string,
    town?: string,
    detailAddress?: string,
    latitude?: number,
    longitude?: number,
    phoneNumber?: string,
    email?: string,
    commissionRate?: number,
    bin?: string,
    bank?: string,
    individualCompany?: boolean,
}

export interface UpdatingAgencyPayload {
    level: number,
    agencyName: number,
    province?: string,
    district?: string,
    town?: string,
    detailAddress?: string,
    latitude?: number,
    longitude?: number,
    phoneNumber?: string,
    email?: string,
    commissionRate?: number,
    bin?: string,
    bank?: string,
}

export class AgencyOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = host + "/agencies";
    }

    async create(payload: CreatingAgencyPayload, token: String) {
        try {
            const response = await axios.post(`${this.baseUrl}/create`, payload, {
                withCredentials: true,
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error creating agency: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async search(criteria: SearchingAgencyCriteria) {
        try {
            const response = await axios.post(`${this.baseUrl}/search`, criteria, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error searching agency: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async update(agencyId: string, payload: UpdatingAgencyPayload) {
        try {
            const response = await axios.put(`${this.baseUrl}/update?agencyId=${agencyId}`, payload, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error updating agency: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async deleteAgency(agencyId: string) {
        try {
            const response = await axios.delete(`${this.baseUrl}/delete?agencyId=${agencyId}`, {
                withCredentials: true,
            });

            return { error: response.data.error, message: response.data.message, data: response.data.data };
        }
        catch (error: any) {
            console.log("Error deleting agency: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }
}

//Shipment Operation
export interface CreatingShipmentInfo {
    agencyIdDest?: string
}

export interface FindingShipmentConditions {
    shipmentId?: string,
    tranportPartnerId?: string,
    staffId?: string
}

export interface DecomposingShipmentInfo {
    orderIds: Array<String>;
}

export interface OperatingWithOrderInfo {
    orderIds: Array<String>;
}

export interface ShipmentID {
    shipmentId: string
}

export interface UndertakingShipmentInfo {
    shipmentId: string,
}


export class ShipmentsOperation {
    private baseUrl: string;
    constructor() {
        this.baseUrl = host + "/shipments";
    }

    async check(condition: ShipmentID) {
        try {
            const response = await axios.post(`${this.baseUrl}/check?shipmentId=${condition.shipmentId}`, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, existed: data.existed, message: data.message };
        } catch (error: any) {
            console.log("Error checking exist shipment: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // async getAllAgencies() {
    //     try {
    // 		const response = await axios.get(`${this.baseUrl}/get_agencies`, {
    // 			withCredentials: true,
    // 		});

    // 		const data = response.data;
    // 		return { error: data.error, data: data.data, message: data.message };
    // 	} catch (error: any) {
    // 		console.log("Error getting all agencies: ", error?.response?.data);
    //         console.error("Request that caused the error: ", error?.request);
    //         return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
    // 	}
    // }

    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    async create(info: CreatingShipmentInfo) {
        try {
            const response = await axios.post(`${this.baseUrl}/create`, info, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error: any) {
            console.log("Error creating shipment: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async getOrdersFromShipment(condition: ShipmentID) {
        try {
            const response = await axios.get(`${this.baseUrl}/get_orders?shipmentId=${condition.shipmentId}`, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, data: data.data, message: data.message };
        } catch (error: any) {
            console.log("Error getting orders from shipment: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    async addOrdersToShipment(condition: ShipmentID, info: OperatingWithOrderInfo) {
        try {
            const response = await axios.post(`${this.baseUrl}/add_orders?shipmentId=${condition.shipmentId}`, info, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error: any) {
            console.log("Error adding orders to shipment: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    async deleteOrderFromShipment(condition: ShipmentID, info: OperatingWithOrderInfo) {
        try {
            const response = await axios.post(`${this.baseUrl}/remove_orders?shipmentId=${condition.shipmentId}`, info, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error: any) {
            console.log("Error deleting order from shipment: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: AGENCY_MANAGER, AGENCY_TELLER
    async confirmCreate(condition: ShipmentID) {
        try {
            const response = await axios.post(`${this.baseUrl}/confirm_create`, condition, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error: any) {
            console.log("Error confirming creat shipment: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    async get(condition: FindingShipmentConditions) {
        try {
            const response = await axios.post(`${this.baseUrl}/search`, condition, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, data: data.data, message: data.message };
        } catch (error: any) {
            console.log("Error getting shipments: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    async delete(condition: ShipmentID) {
        try {
            const response = await axios.delete(`${this.baseUrl}/delete?shipmentId=${condition.shipmentId}`, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error: any) {
            console.log("Error deleting shipment: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: ADMIN, MANAGER, TELLER, AGENCY_MANAGER, AGENCY_TELLER
    async decompose(condition: ShipmentID, info: DecomposingShipmentInfo) {
        try {
            const response = await axios.post(`${this.baseUrl}/decompose?shipmentId=${condition.shipmentId}`, info, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error: any) {
            console.log("Error decomposing shipment: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: AGENCY_MANAGER, AGENCY_TELLER
    async receive(condition: ShipmentID) {
        try {
            const response = await axios.post(`${this.baseUrl}/receive`, condition, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error: any) {
            console.log("Error receiving shipment: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: SHIPPER, AGENCY_SHIPPER, PARTNER_SHIPPER
    async undertake(info: UndertakingShipmentInfo) {
        try {
            const response = await axios.post(`${this.baseUrl}/undertake`, info, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error: any) {
            console.log("Error undertaking shipment: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: ADMIN, MANAGER, TELLER
    async approve(condition: ShipmentID) {
        try {
            const response = await axios.put(`${this.baseUrl}/accept?shipmentId=${condition.shipmentId}`, null, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error: any) {
            console.log("Error approve shipment: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }
}



export interface CreatingNewShipperTasksInfo {
    shipmentId: string,
    vehicleId: string,
}

export interface GettingTasksCondition {
    staffId?: string,
    option?: number,
}

export interface ConfirmingCompletedTaskInfo {
    id: number,
}

export interface GettingHistoryInfo {
    option?: number,
}

export interface DeletingShipperTasksCondition {
    id: number,
}

export class ShippersOperation {
    private baseUrl: string;
    constructor() {
        this.baseUrl = host + "/tasks/shippers";
    }

    // ROLE: AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    async getObjectsCanHandleTask() {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/get_objects`, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, data: data.data, message: data.message };
        } catch (error: any) {
            console.log("Error getting object can handle task: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    async createNewTasks(info: CreatingNewShipperTasksInfo) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, info, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error: any) {
            console.log("Error creating new tasks: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER, AGENCY_SHIPPER
    async getTask(condition: GettingTasksCondition) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/get`, condition, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, data: data.data, message: data.message };
        } catch (error: any) {
            console.log("Error getting tasks: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: AGENCY_SHIPPER
    async confirmCompletedTask(condition: ConfirmingCompletedTaskInfo) {
        try {
            const response: AxiosResponse = await axios.patch(`${this.baseUrl}/complete?id=${condition.id}`, null, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error: any) {
            console.log("Error confirming completed task: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER, AGENCY_SHIPPER 
    async getHistory(condition: GettingHistoryInfo) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/history/get`, condition, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, data: data.data, message: data.message };
        } catch (error: any) {
            console.log("Error getting history: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    async deleteTask(condition: DeletingShipperTasksCondition) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/delete`, condition, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error: any) {
            console.log("Error deleting task: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }
}


export interface CreatingNewDriverTasksInfo {
    shipmentIds: Array<string>,
    vehicleId: string,
}

export interface GettingTasksCondition {
    staffId?: string,
    option?: number,
}

export interface ConfirmingCompletedTaskCondition {
    id: number,
}

export interface DeletingDriverTaskCondition {
    id: number,
}

export interface GettingHistoryInfo {
    option?: number,
}


export class DriversOperation {
    private baseUrl: string;
    constructor() {
        this.baseUrl = host + "/tasks/drivers";
    }

    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    async getObjectsCanHandleTask() {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/get_objects`, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, data: data.data, message: data.message };
        } catch (error: any) {
            console.log("Error getting object can handle task: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    async createNewTasks(info: CreatingNewDriverTasksInfo) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, info, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error: any) {
            console.log("Error creating new tasks: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER, PARTNER_DRIVER
    async getTask(condition: GettingTasksCondition) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/get`, condition, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, data: data.data, message: data.message };
        } catch (error: any) {
            console.log("Error getting tasks: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: PARTNER_DRIVER
    async confirmCompletedTask(condition: ConfirmingCompletedTaskCondition) {
        try {
            const response: AxiosResponse = await axios.delete(`${this.baseUrl}/complete?id=${condition.id}`, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error: any) {
            console.log("Error confirming completed task: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    // ROLE: ADMIN, MANAGER, HUMAN_RESOURCE_MANAGER, AGENCY_MANAGER, AGENCY_HUMAN_RESOURCE_MANAGER
    async deleteTask(condition: DeletingDriverTaskCondition) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/delete`, condition, {
                withCredentials: true,
            });

            const data = response.data;
            return { error: data.error, message: data.message };
        } catch (error: any) {
            console.log("Error deleting task: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { error: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }
}

//Business

export class VoucherOperation {
    private baseUrl: string;

    constructor() {
        this.baseUrl = host + '/voucher';
    }
    async getVouchersByCustomer(page: number, size: number, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/get`, {
                params: {
                    page: page,
                    size: size
                },
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error fetching vouchers: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async search(payload: SearchPayload, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/search`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error searching vouchers: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }
}