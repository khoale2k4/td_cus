import { UUID } from "crypto";

export enum StaffRole {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    HUMAN_RESOURCE_MANAGER = 'HUMAN RESOURCE MANAGER',
    OPERATION_STAFF = 'OPERATION STAFF',
    TELLER = 'TELLER',
    AGENCY_MANAGER = 'AGENCY MANAGER',
    AGENCY_HUMAN_RESOURCE_MANAGER = 'AGENCY HUMAN RESOURCE MANAGER',
    AGENCY_OPERATION_STAFF = 'AGENCY OPERATION STAFF',
    AGENCY_TELLER = 'AGENCY TELLER',
    SHIPPER = 'SHIPPER'
}
export enum UserRole {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    HUMAN_RESOURCE_MANAGER = 'HUMAN RESOURCE MANAGER',
    OPERATION_STAFF = 'OPERATION STAFF',
    TELLER = 'TELLER',
    AGENCY_MANAGER = 'AGENCY MANAGER',
    AGENCY_HUMAN_RESOURCE_MANAGER = 'AGENCY HUMAN RESOURCE MANAGER',
    AGENCY_OPERATION_STAFF = 'AGENCY OPERATION STAFF',
    AGENCY_TELLER = 'AGENCY TELLER',
    CUSTOMER = 'CUSTOMER',
    SHIPPER = 'SHIPPER'
}

export enum OtpPurpose {
    CREATE_ACCOUNT = 'CREATE_ACCOUNT',
    RESET_PASSWORD = 'RESET_PASSWORD'
}

export enum AgencyType {
    DL = 'Đại lý',
    BC = 'Bưu cục'
}

export enum ShipperType {
    NT = 'NT',
    LT = 'LT'
}

export enum OrderStatus {
    DELIVERED_SUCCESS = 'DELIVERED SUCCESS',     // "Giao hàng thành công"
    PROCESSING = 'PROCESSING',            // "Đang được xử lí"
    TAKING = 'TAKING',                // "Chờ lấy hàng"
    TAKEN_SUCCESS = 'TAKEN SUCCESS',         // "Lấy hàng thành công"
    TAKEN_FAIL_DUE_TO_TIMEOUT = 'TAKEN FAIL DUE TO TIMEOUT',            // "Lấy hàng thất bại"
    TAKEN_FAIL_DUE_TO_SHIPPER = 'TAKEN FAIL DUE TO SHIPPER',
    TAKEN_FAIL_DUE_TO_CUSTOMER_CANCELLING = 'TAKEN FAIL DUE TO CUSTOMER CANCELLING',
    DELIVERING = 'DELIVERING',            // "Đang giao tới người nhận"
    DELIVERED_CANCEL = 'DELIVERED CANCEL',      // "Đã hủy yêu cầu giao hàng"
    DELIVERED_FAIL = 'DELIVERED FAIL',        // "Giao hàng thất bại"
    REFUNDING = 'REFUNDING',             // "Đang hoàn hàng"
    REFUNDED_SUCCESS = 'REFUNDED SUCCESS',     // "Hoàn hàng thành công"
    REFUNDED_FAIL = 'REFUNDED FAIL',        // "Hoàn hàng thất bại"
    ENTER_AGENCY = 'ENTER AGENCY',         // "Đã tới bưu cục"
    LEAVE_AGENCY = 'LEAVE AGENCY',         // "Đã rời bưu cục"
    THIRD_PARTY_DELIVERY = 'THIRD PARTY DELIVERY', // "Kiện hàng được chuyển cho đối tác thứ ba giao"
    RECEIVED = 'RECEIVED'             // "Đã được tiếp nhận"
}

export enum NotificationType {
    ORDER = 'ORDER',
    ACCOUNT = 'ACCOUNT'
}

export enum OrderNotificationType {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    DELIVERING = 'DELIVERING',
    RECEIVED = 'RECEIVED',
    CANCELED = 'CANCELED'
}

export enum SendingOrderRequestStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    CANCELED = 'CANCELED'
}

export enum AccountNotificationType {

}

export enum OrderImageType {
    RECEIVE = 'RECEIVE',
    SEND = 'SEND'
}

export enum OrderSignatureType {
    RECEIVE = 'RECEIVE',
    SEND = 'SEND'
}

export enum GoodType {
    FOOD = 'FOOD',
    FRAGILE = 'FRAGILE',
    CLOTHES = 'CLOTHES',
    OTHER = 'OTHER'
}

export enum OrderLocationType {
    HOME = 'HOME',
    COMPANY = 'COMPANY',
    DEFAULT = 'DEFAULT'
}

export enum ServiceType {
    SR = 'SR',
    SN = 'SN'
}

export enum MissionType {
    TAKING = 'TAKING',
    DELIVERING = 'DELIVERING'
}

export const adminRoles = [UserRole.ADMIN, UserRole.MANAGER, UserRole.HUMAN_RESOURCE_MANAGER, UserRole.TELLER, UserRole.OPERATION_STAFF];
export const agencyRoles = [UserRole.AGENCY_MANAGER, UserRole.AGENCY_HUMAN_RESOURCE_MANAGER, UserRole.AGENCY_TELLER, UserRole.AGENCY_OPERATION_STAFF];

export const staffShouldBeGotAttributes = ['id', 'staffId', 'username', 'agencyId', 'fullname', 'phoneNumber', 'email', 'cccd',
    'province', 'district', 'town', 'detailAddress', 'birthDate', 'bin', 'bank', 'deposit', 'salary', 'paidSalary', 'avatar'];

export interface CreateCargoInsuranceDto {
    note: string;
    hasDeliveryCare: boolean;
    shippingBillId: UUID;
}

export interface UpdateAgencyDto{
    manager: CreateAgencyManager;
    type: AgencyType;
    level: number;
    postalCode: string;
    name: string;
    province: string;
    district: string;
    town: string;
    detailAddress: string;
    latitude: number;
    longitude: number;
    managedWards: string[];
    phoneNumber: string;
    email: string;
    commissionRate: number; 
    bin: string;
    bank: string;
    isIndividual: boolean;
    company: CreateCompanyDto;
    revenue: number;
    agencyId: string;
}

export interface ImageChangeStatusDto {
    id: UUID;
    isChanged: boolean;
}

export interface UpdateCargoInsuranceDto {
    note: string;
    hasDeliveryCare: boolean;
    shippingBillId: UUID;
    areImagesChanged: ImageChangeStatusDto[];
}

export interface ConfigDepositDto {
    deposit: number;
    province: string;
    district: string;
    ward: string;
}

export interface ConfigServicesDto {
    wardId: number;
    serviceNames: ServiceType[];
}

export interface UpdateOrderDto {
    mass?: number;
    height?: number;
    width?: number;
    length?: number;
    cod?: number;
    statusCode?: OrderStatus;
}

export interface UpdateFavoriteOrderLocationDto {
    description: string;
    name: string;
    phoneNumber: string;
    lat: number;
    lng: number;
}

export interface UpdateOrderLocationDto {
    name: string;
    lat: number;
    lng: number;
}

export interface CalculateFeePayload {
    serviceType: string;
    cod: number;
    latSource: number,
    longSource: number,
    latDestination: number,
    longDestination: number
}
  
export interface CreateOrderDto {
    serviceType: string;
    nameSender: string;
    phoneNumberSender: string;
    nameReceiver: string;
    phoneNumberReceiver: string;
    mass: number;
    height: number;
    width: number;
    length: number;
    provinceSource: string;
    districtSource: string;
    wardSource: string;
    detailSource: string;
    longSource: number;
    latSource: number;
    provinceDest: string;
    districtDest: string;
    wardDest: string;
    detailDest: string;
    longDestination: number;
    latDestination: number;
    fee: number;
    cod: number;
    agencyId: string;
    userId: string;
}



export interface CreateFavoriteOrderLocationDto {
    description: string;
    name: string;
    phoneNumber: string;
    lat: number;
    lng: number;
}

export interface CreateGiftOrderTopicDto {
    name: string;
}

export interface CreateOrderLocationDto {
    type: OrderLocationType;
    lat: number;
    lng: number;
}

export interface SingleFileUpload {
    file: File;
}

export interface CreateShipmentDto {
    destinationAgencyId: UUID;
    vehicleId: UUID;
}

export interface AddOrderToShipmentDto {
    orderIds: UUID[];
    shipmentId: UUID; 
}

export interface MultiFileUpload {
    files: File[];
}

export interface FileID {
    fileId: UUID
}

export interface AddJourneyNodeDto {
    lat: number;
    lng: number;
}

export interface UpdateOrderDto {
    mass?: number;
    height?: number;
    width?: number;
    length?: number;
    cod?: number;
    statusCode?: OrderStatus;
}


export interface CreateAgencyManager {
    fullname: string;
    cccd: string;
    phoneNumber: string;
    email: string;
    province?: string;
    district?: string;
    town?: string;
    detailAddress?: string;
    birthDate?: Date;
    bin?: string;
    bank?: string;
    salary?: number;
  }

  export interface CreateShippingBillDto {
    companyName: string;
    companyAddress: string;
    taxCode: string;
    email: string;
}

export interface AssignTaskToShipperDto {
    orderId: UUID;
    staffId: UUID;
    mission: MissionType;
}

export interface UpdateTaskDto {
    orderId: UUID;
    staffId: UUID;
    completedAt: Date;
    completed: boolean;
    mission: MissionType;
}
  
  export interface CreateAgencyDto {
    manager: CreateAgencyManager;
    type: AgencyType;
    level: number;
    postalCode: string;
    name: string;
    province: string;
    district: string;
    town: string;
    detailAddress: string;
    latitude: number;
    longitude: number;
    managedWards: string[];
    phoneNumber: string;
    email: string;
    commissionRate: number;
    bin: string;
    bank: string;
    isIndividual: boolean;
    company: CreateCompanyDto;
    revenue: number;
    agencyId: string;
}

export interface CreateCompanyDto {
    taxcode: string;
    name: string
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


export interface CreateStaffDto {
    agencyId: string;
    fullname: string;
    phoneNumber: string;
    email: string;
    cccd: string;
    province?: string;
    district?: string;
    town?: string;
    detailAddress?: string;
    birthDate?: Date;
    bin?: string;
    bank?: string;
    deposit?: number;
    salary?: number;
    roles: StaffRole[];
    managedWards: string[];
}

export interface UpdateShipperStatusDto {
    currentLat: number;
    currentLong: number;
}

export interface UpdateStaffDto {
    agencyId: string;
    fullname: string;
    phoneNumber: string;
    email: string;
    cccd: string;
    province: string;
    district: string;
    detailAddress: string;
    birthDate: Date;
    bin: string;
    bank: string;
    deposit: number;
    salary: number;
    roles: StaffRole[];
    managedWards: string[];
    shipperType: ShipperType;
}

export interface CreateCustomerDto {
    id: UUID;
    phoneNumber: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

export interface CustomerLoginDto {   
    phoneNumber: string;
    email: string;
}

export interface UpdateCustomerDto {
    firstName: string;
    lastName: string;
    email: string;
}

export interface StaffLoginDto {
    username: string;
    password: string;
}
  
export interface UpdateCustomerDto {
    firstName: string;
    lastName: string;
    email: string;
}

export interface VerifyOtpDto {
    id: UUID;
    otp: string;
}
  
export interface CreateVoucherDto {
    numOfOrders: number;
    discount: number;
    startDate: Date;
    endDate: Date;
    area: {
        ward: string;
        district: string;
        source: string;
    }
}