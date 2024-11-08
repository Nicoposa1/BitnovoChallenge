export interface Currency {
  symbol: string;
  name: string;
  min_amount: string;
  max_amount: string;
  image: string;
  blockchain: string;
}

export const Fonts = {
  MulishRegular: 'Mulish-Regular',
  MulishSemiBold: 'Mulish-SemiBold',
  MulishBold: 'Mulish-Bold',
};


export interface DeviceCreateRequest {
  name: string;
}

export interface DeviceCreateResponse {
  name: string;
  identifier: string;
}

export interface Order {
  identifier: string;
  reference: string | null;
  created_at: string;
  edited_at: string;
  status: string;
  fiat_amount: number;
  crypto_amount: number | null;
  unconfirmed_amount: number;
  confirmed_amount: number;
  currency_id: string;
  merchant_device_id: number;
  merchant_device: string;
  address: string | null;
  tag_memo: string | null;
  url_ko: string | null;
  url_ok: string | null;
  url_standby: string | null;
  expired_time: string | null;
  good_fee: boolean;
  notes: string;
  rbf: boolean;
  safe: boolean;
  fiat: string;
  language: string;
  percentage: number;
  received_amount: number;
  balance_based: string;
  internal_data: string;
  transactions: Array<object>;
}

export interface CreateOrderRequest {
  expected_output_amount: number;
  input_currency?: string;
  merchant_urlko?: string;
  merchant_urlok?: string;
  merchant_url_standby?: string;
  notes?: string;
  reference?: string;
  fiat?: string;
  language?: string;
  home_address?: string;
  address_additional?: string;
  email_client?: string;
  full_name?: string;
  address_number?: string;
  zip_code?: string;
  city?: string;
  province?: string;
  country?: string;
  phone_number?: string;
  nif?: string;
  internal_data?: string;
}

export interface CreateOrderResponse {
  identifier: string;
  reference: string | null;
  payment_uri: string | null;
  web_url: string;
  address: string | null;
  tag_memo: string | null;
  input_currency: string | null;
  expected_input_amount: number | null;
  rate: number | null;
  notes: string;
  fiat: string;
  language: string;
}

export type Country = { name: string, code: string }

export const countries: Array<Country> = [
  {
    name: 'España',
    code: '+34',
  },
  {
    name: 'Equatorial Guinea',
    code: '+240',
  },
  {
    name: 'Grecia',
    code: '+30',
  },
  {
    name: 'South Georgia and the S...',
    code: '+500',
  },
  {
    name: 'Guatemala',
    code: '+502',
  },
  {
    name: 'Guyana',
    code: '+592',
  },
  {
    name: 'Hong Kong',
    code: '+852',
  },
  {
    name: 'Honduras',
    code: '+504',
  }
]


export type CurrencyName = { name: string, code: string, symbol: string }

export const currencies: Array<CurrencyName> = [
  {
    name: 'Euro',
    code: 'EUR',
    symbol: '€',
  },
  {
    name: 'Dólar Estadounidense',
    code: 'USD',
    symbol: '$'
  },
  {
    name: 'Libra Esterlina',
    code: 'GBP',
    symbol: '£'
  }
];