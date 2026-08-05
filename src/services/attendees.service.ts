// import { API_ENDPOINTS } from '@/constants/api';
// import {
//   buildWebsiteAuthHeaders,
//   clearWebsiteAuth,
//   ensureWebsiteAuth,
//   getApiErrorStatus,
// } from '@/lib/website-auth';
// import { apiFetch } from '@/services/apiFetch';

// /* =========================================================
//    ATTENDEE REGISTRATION
// ========================================================= */

// export type RegisterAttendeeApiBody = {
//   eventId: string;
//   name: string;
//   email: string;
//   countryCode: string;
//   phoneNumber: string;
//   organization: string;
// };

// export type AttendeeRegistrationInput = {
//   eventId: string;
//   name: string;
//   email: string;
//   phoneNumber: string;
//   countryCode?: string;
//   organization: string;
// };

// /* =========================================================
//    CXO NETWORK
// ========================================================= */

// export type CxoNetworkApplicationInput = {
//   firstName: string;
//   lastName: string;
//   title: string;
//   designation: string;
//   officialEmail: string;
//   telephone: string;
//   mobile: string;
//   linkedin: string;
//   companyName: string;
//   companyAddress: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   country: string;
//   companyCategory?: string;
//   businessVertical?: string;
// };

// type RegistrationResponse = {
//   success?: boolean;
//   message?: string;
//   data?: unknown;
// };

// /* =========================================================
//    REGISTER ATTENDEE
// ========================================================= */

// function buildRegisterAttendeeBody(input: AttendeeRegistrationInput): RegisterAttendeeApiBody {
//   return {
//     eventId: input.eventId,
//     name: input.name,
//     email: input.email,
//     countryCode: input.countryCode ?? '+91',
//     phoneNumber: input.phoneNumber,
//     organization: input.organization,
//   };
// }

// function assertRegistrationSaved(response: RegistrationResponse) {
//   if (response.success === false) {
//     throw new Error(response.message || 'Registration was not saved.');
//   }
// }

// async function postAttendeeRegistration(body: RegisterAttendeeApiBody) {
//   const auth = await ensureWebsiteAuth();

//   return apiFetch<RegistrationResponse>(API_ENDPOINTS.WEBSITE.ATTENDEES.REGISTER, {
//     method: 'POST',
//     requireAuth: false,
//     headers: {
//       ...buildWebsiteAuthHeaders(auth),
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(body),
//   });
// }

// export async function submitAttendeeRegistration(input: AttendeeRegistrationInput) {
//   const body = buildRegisterAttendeeBody(input);

//   try {
//     const response = await postAttendeeRegistration(body);

//     assertRegistrationSaved(response);

//     return response;
//   } catch (error: unknown) {
//     const statusCode = getApiErrorStatus(error);

//     if (statusCode === 401) {
//       clearWebsiteAuth();

//       const response = await postAttendeeRegistration(body);

//       assertRegistrationSaved(response);

//       return response;
//     }

//     throw error;
//   }
// }

// /* =========================================================
//    CXO NETWORK BODY
// ========================================================= */

// function buildCxoNetworkBody(input: CxoNetworkApplicationInput) {
//   const websiteId = process.env.NEXT_PUBLIC_WEBSITE_ID?.trim();

//   const body = {
//     firstName: input.firstName.trim(),
//     lastName: input.lastName.trim(),
//     title: input.title.trim(),

//     // Frontend field -> Backend field
//     currentDesignation: input.designation.trim(),
//     email: input.officialEmail.trim(),
//     telephoneNo: input.telephone.trim(),
//     cioMobilePhone: input.mobile.trim(),
//     linkedInLink: input.linkedin.trim(),

//     companyName: input.companyName.trim(),
//     companyAddress: input.companyAddress.trim(),
//     city: input.city.trim(),
//     state: input.state.trim(),
//     postalCode: input.postalCode.trim(),
//     country: input.country.trim(),

//     companyCategory: input.companyCategory?.trim() || '',
//     businessVertical: input.businessVertical?.trim() || '',

//     websiteId,
//   };

//   // console.log('========== CXO NETWORK PAYLOAD ==========');
//   // console.log(JSON.stringify(body, null, 2));
//   // console.log('==========================================');

//   // console.log('CXO WEBSITE ID:', process.env.NEXT_PUBLIC_WEBSITE_ID);

//   // console.log('CXO ENDPOINT:', API_ENDPOINTS.WEBSITE.ATTENDEES.CXO_NETWORK);

//   return body;
// }

// /* =========================================================
//    POST CXO NETWORK APPLICATION
// ========================================================= */

// async function postCxoNetworkApplication(body: ReturnType<typeof buildCxoNetworkBody>) {
//   const auth = await ensureWebsiteAuth();

//   const headers = {
//     ...buildWebsiteAuthHeaders(auth),
//     'Content-Type': 'application/json',
//   };

//   // try {
//   //   const response = await apiFetch<RegistrationResponse>(
//   //     API_ENDPOINTS.WEBSITE.ATTENDEES.CXO_NETWORK,
//   //     {
//   //       method: 'POST',
//   //       requireAuth: false,
//   //       headers,
//   //       body: JSON.stringify(body),
//   //     },
//   //   );
//   //   return response;
//   // } catch (error: unknown) {
//   //   throw error;
//   // }
// }

// /* =========================================================
//    SUBMIT CXO NETWORK APPLICATION
// ========================================================= */

// export async function submitCxoNetworkApplication(input: CxoNetworkApplicationInput) {
//   const body = buildCxoNetworkBody(input);

//   try {
//     const response = await postCxoNetworkApplication(body);

//     assertRegistrationSaved(response);

//     return response;
//   } catch (error: unknown) {
//     const statusCode = getApiErrorStatus(error);

//     if (statusCode === 401) {
//       // console.log('CXO Network received 401. Refreshing website authentication...');

//       clearWebsiteAuth();

//       const response = await postCxoNetworkApplication(body);

//       assertRegistrationSaved(response);

//       return response;
//     }

//     throw error;
//   }
// }

import { API_ENDPOINTS } from '@/constants/api';
import {
  buildWebsiteAuthHeaders,
  clearWebsiteAuth,
  ensureWebsiteAuth,
  getApiErrorStatus,
} from '@/lib/website-auth';
import { apiFetch } from '@/services/apiFetch';

/* =========================================================
   ATTENDEE REGISTRATION
========================================================= */

export type RegisterAttendeeApiBody = {
  eventId: string;
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  organization: string;
};

export type AttendeeRegistrationInput = {
  eventId: string;
  name: string;
  email: string;
  phoneNumber: string;
  countryCode?: string;
  organization: string;
};

/* =========================================================
   CXO NETWORK
========================================================= */

export type CxoNetworkApplicationInput = {
  firstName: string;
  lastName: string;
  title: string;
  designation: string;
  officialEmail: string;
  telephone: string;
  mobile: string;
  linkedin: string;
  companyName: string;
  companyAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  companyCategory?: string;
  businessVertical?: string;
};

type RegistrationResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
};

/* =========================================================
   REGISTER ATTENDEE
========================================================= */

function buildRegisterAttendeeBody(input: AttendeeRegistrationInput): RegisterAttendeeApiBody {
  return {
    eventId: input.eventId,
    name: input.name,
    email: input.email,
    countryCode: input.countryCode ?? '+91',
    phoneNumber: input.phoneNumber,
    organization: input.organization,
  };
}

function assertRegistrationSaved(response: RegistrationResponse) {
  if (response.success === false) {
    throw new Error(response.message || 'Registration was not saved.');
  }
}

async function postAttendeeRegistration(body: RegisterAttendeeApiBody) {
  const auth = await ensureWebsiteAuth();

  return apiFetch<RegistrationResponse>(API_ENDPOINTS.WEBSITE.ATTENDEES.REGISTER, {
    method: 'POST',
    requireAuth: false,
    headers: {
      ...buildWebsiteAuthHeaders(auth),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export async function submitAttendeeRegistration(input: AttendeeRegistrationInput) {
  const body = buildRegisterAttendeeBody(input);

  try {
    const response = await postAttendeeRegistration(body);

    assertRegistrationSaved(response);

    return response;
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    if (statusCode === 401) {
      clearWebsiteAuth();

      const response = await postAttendeeRegistration(body);

      assertRegistrationSaved(response);

      return response;
    }

    throw error;
  }
}

/* =========================================================
   BUILD CXO NETWORK BODY
========================================================= */

function buildCxoNetworkBody(input: CxoNetworkApplicationInput) {
  const websiteId = process.env.NEXT_PUBLIC_WEBSITE_ID?.trim();

  if (!websiteId) {
    throw new Error('NEXT_PUBLIC_WEBSITE_ID is missing from .env.local');
  }

  const body = {
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    title: input.title.trim(),

    /*
     * Frontend -> Backend mapping
     *
     * designation     -> currentDesignation
     * officialEmail   -> email
     * telephone       -> telephoneNo
     * mobile          -> cioMobilePhone
     * linkedin        -> linkedInLink
     */

    currentDesignation: input.designation.trim(),
    email: input.officialEmail.trim(),
    telephoneNo: input.telephone.trim(),
    cioMobilePhone: input.mobile.trim(),
    linkedInLink: input.linkedin.trim(),

    companyName: input.companyName.trim(),
    companyAddress: input.companyAddress.trim(),
    city: input.city.trim(),
    state: input.state.trim(),
    postalCode: input.postalCode.trim(),
    country: input.country.trim(),

    companyCategory: input.companyCategory?.trim() || '',

    businessVertical: input.businessVertical?.trim() || '',

    websiteId,
  };

  return body;
}

/* =========================================================
   POST CXO NETWORK APPLICATION
========================================================= */

async function postCxoNetworkApplication(body: ReturnType<typeof buildCxoNetworkBody>) {
  const auth = await ensureWebsiteAuth();

  const headers = {
    ...buildWebsiteAuthHeaders(auth),
    'Content-Type': 'application/json',
  };

  /* -----------------------------------------
     DEBUG REQUEST
  ----------------------------------------- */

  // console.log('========== CXO NETWORK REQUEST ==========');

  // console.log('Endpoint:', API_ENDPOINTS.WEBSITE.ATTENDEES.CXO_NETWORK);

  // console.log('Payload:', JSON.stringify(body, null, 2));

  // console.log('Website ID:', body.websiteId);

  // console.log('=========================================');

  try {
    /* -----------------------------------------
       ACTUAL API REQUEST
    ----------------------------------------- */

    const response = await apiFetch<RegistrationResponse>(
      API_ENDPOINTS.WEBSITE.ATTENDEES.CXO_NETWORK,
      {
        method: 'POST',
        requireAuth: false,
        headers,
        body: JSON.stringify(body),
      },
    );

    /* -----------------------------------------
       DEBUG RESPONSE
    ----------------------------------------- */

    // console.log('========== CXO NETWORK RESPONSE ==========');

    // console.log(JSON.stringify(response, null, 2));

    // console.log('==========================================');

    return response;
  } catch (error: unknown) {
    /* -----------------------------------------
       DEBUG ERROR
    ----------------------------------------- */

    // console.error('========== CXO NETWORK API ERROR ==========');

    // console.error('Error:', error);

    const errorObject = error as {
      data?: unknown;
      message?: string;
      status?: number;
    };

    // console.error('Status:', errorObject.status);

    // console.error('Message:', errorObject.message);

    if (errorObject.data) {
      // console.error('Response:', JSON.stringify(errorObject.data, null, 2));
    }

    // console.error('===========================================');

    throw error;
  }
}

/* =========================================================
   SUBMIT CXO NETWORK APPLICATION
========================================================= */

export async function submitCxoNetworkApplication(input: CxoNetworkApplicationInput) {
  const body = buildCxoNetworkBody(input);

  /* -----------------------------------------
     LOG FINAL PAYLOAD
  ----------------------------------------- */

  // console.log('CXO Network API Request Body:', JSON.stringify(body, null, 2));

  try {
    const response = await postCxoNetworkApplication(body);

    assertRegistrationSaved(response);

    return response;
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    // console.error('CXO Network submit error:', error);

    /* -----------------------------------------
       RETRY ON 401
    ----------------------------------------- */

    if (statusCode === 401) {
      // console.log('CXO Network received 401. Refreshing website authentication...');

      clearWebsiteAuth();

      const response = await postCxoNetworkApplication(body);

      assertRegistrationSaved(response);

      return response;
    }

    throw error;
  }
}
