// import { API_ENDPOINTS } from '@/constants/api';
// import {
//   buildWebsiteAuthHeaders,
//   clearWebsiteAuth,
//   ensureWebsiteAuth,
//   getApiErrorStatus,
// } from '@/lib/website-auth';
// import { apiFetch } from '@/services/apiFetch';

// /** Matches backend RegisterAttendeeDto — all 6 fields sent on every request. */
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

// export type CxoNetworkApplicationInput = {
//   firstName: string;
//   lastName: string;
//   title: string;
//   currentDesignation: string;
//   email: string;
//   telephoneNo: string;
//   cioMobilePhone: string;
//   linkedInLink: string;
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
//     headers: buildWebsiteAuthHeaders(auth),
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
// function buildCxoNetworkBody(input: CxoNetworkApplicationInput) {
//   const body = {
//     firstName: input.firstName,
//     lastName: input.lastName,
//     title: input.title,
//     currentDesignation: input.currentDesignation,
//     email: input.email,
//     telephoneNo: input.telephoneNo,
//     cioMobilePhone: input.cioMobilePhone,
//     linkedInLink: input.linkedInLink,
//     companyName: input.companyName,
//     companyAddress: input.companyAddress,
//     city: input.city,
//     state: input.state,
//     postalCode: input.postalCode,
//     country: input.country,
//     companyCategory: input.companyCategory,
//     businessVertical: input.businessVertical,
//   };

//   return Object.fromEntries(
//     Object.entries(body).filter(([, value]) => value !== undefined && value !== null && value !== ''),
//   );
// }

// async function postCxoNetworkApplication(body: ReturnType<typeof buildCxoNetworkBody>) {
//   const auth = await ensureWebsiteAuth();
//   const payload = {
//     ...body,
//     websiteId: auth.websiteId,
//   };

//   return apiFetch<RegistrationResponse>(API_ENDPOINTS.WEBSITE.ATTENDEES.CXO_NETWORK, {
//     method: 'POST',
//     requireAuth: false,
//     headers: buildWebsiteAuthHeaders(auth),
//     body: JSON.stringify(payload),
//   });
// }

// export async function submitCxoNetworkApplication(input: CxoNetworkApplicationInput) {
//   const body = buildCxoNetworkBody(input);

//   try {
//     const response = await postCxoNetworkApplication(body);
//     assertRegistrationSaved(response);
//     return response;
//   } catch (error: unknown) {
//     const statusCode = getApiErrorStatus(error);

//     if (statusCode === 401) {
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

/**
 * Backend RegisterAttendeeDto
 */
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

/**
 * CXO Network form input.
 *
 * These names match the frontend form.
 */
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

  /**
   * Backend requires websiteId.
   */
  websiteId: string;
};

type RegistrationResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
};

/* -------------------------------------------------------------------------- */
/*                         NORMAL EVENT REGISTRATION                          */
/* -------------------------------------------------------------------------- */

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
    headers: buildWebsiteAuthHeaders(auth),
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

/* -------------------------------------------------------------------------- */
/*                           CXO NETWORK REGISTRATION                         */
/* -------------------------------------------------------------------------- */

/**
 * Converts frontend field names to backend field names.
 *
 * Frontend:
 * designation
 * officialEmail
 * telephone
 * mobile
 * linkedin
 *
 * Backend:
 * currentDesignation
 * email
 * telephoneNo
 * cioMobilePhone
 * linkedInLink
 */
function buildCxoNetworkBody(input: CxoNetworkApplicationInput) {
  const body = {
    firstName: input.firstName,
    lastName: input.lastName,
    title: input.title,

    // Frontend -> Backend mapping
    currentDesignation: input.designation,
    email: input.officialEmail,
    telephoneNo: input.telephone,
    cioMobilePhone: input.mobile,
    linkedInLink: input.linkedin,

    companyName: input.companyName,
    companyAddress: input.companyAddress,
    city: input.city,
    state: input.state,
    postalCode: input.postalCode,
    country: input.country,

    companyCategory: input.companyCategory ?? '',
    businessVertical: input.businessVertical ?? '',

    websiteId: input.websiteId,
  };

  /**
   * Remove empty values.
   *
   * This prevents empty strings from being sent to the API.
   */
  return Object.fromEntries(
    Object.entries(body).filter(
      ([, value]) => value !== undefined && value !== null && value !== '',
    ),
  );
}

async function postCxoNetworkApplication(body: ReturnType<typeof buildCxoNetworkBody>) {
  const auth = await ensureWebsiteAuth();

  const payload = {
    ...body,
    websiteId: auth.websiteId,
  };

  try {
    // eslint-disable-next-line no-console
    console.log('Posting CXO network payload:', JSON.stringify(payload, null, 2));
    // eslint-disable-next-line no-console
    console.log(
      'CXO request headers:',
      JSON.stringify({
        'x-website-id': auth.websiteId,
        Authorization: auth.token ? 'Bearer <redacted>' : undefined,
      }),
    );
  } catch (e) {
    void e;
  }

  return apiFetch<RegistrationResponse>(API_ENDPOINTS.WEBSITE.ATTENDEES.CXO_NETWORK, {
    method: 'POST',
    requireAuth: false,
    headers: buildWebsiteAuthHeaders(auth),
    body: JSON.stringify(payload),
  });
}

export async function submitCxoNetworkApplication(input: CxoNetworkApplicationInput) {
  const body = buildCxoNetworkBody(input);

  // eslint-disable-next-line no-console
  console.log('CXO Network API Request Body:', JSON.stringify(body, null, 2));

  try {
    const response = await postCxoNetworkApplication(body);

    assertRegistrationSaved(response);

    return response;
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    // Log full error details to aid debugging (do not log tokens)
    try {
      // eslint-disable-next-line no-console
      console.error('CXO Network API error:', {
        status: statusCode,
        error,
      });
      // If the error is an ApiError from apiFetch, it includes `data`
      // Print that in a readable form when available.
      const errObj = error as { data?: unknown };
      if (errObj?.data) {
        // eslint-disable-next-line no-console
        console.error('CXO Network API response body:', JSON.stringify(errObj.data, null, 2));
      }
    } catch (e) {
      void e;
    }

    if (statusCode === 401) {
      clearWebsiteAuth();

      const response = await postCxoNetworkApplication(body);

      assertRegistrationSaved(response);

      return response;
    }

    throw error;
  }
}
