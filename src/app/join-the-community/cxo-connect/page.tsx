// 'use client';

// import React, { FormEvent, useState } from 'react';
// import { submitCxoNetworkApplication } from '@/services/attendees.service';

// const eligibleTitles = [
//   'CIOs – Chief Information Officers',
//   'CTOs – Chief Technology Officers',
//   'CDOs – Chief Digital Officers',
//   'CDOs – Chief Data Officers',
//   'CISOs – Chief Information Security Officers',
//   'ITDMs – Senior Most Information Technology Decision Makers',
// ];

// const initialFormData = {
//   firstName: '',
//   lastName: '',
//   title: '',
//   designation: '',
//   officialEmail: '',
//   telephone: '',
//   mobile: '',
//   linkedin: '',
//   companyName: '',
//   companyAddress: '',
//   city: '',
//   state: '',
//   postalCode: '',
//   country: '',
//   companyCategory: '',
//   businessVertical: '',
// };

// export default function CxoConnectPage() {
//   const [formData, setFormData] = useState(initialFormData);

//   const [submitting, setSubmitting] = useState(false);

//   const [submitError, setSubmitError] =
//     useState<string | null>(null);

//   const [submitSuccess, setSubmitSuccess] =
//     useState(false);

//   function handleChange(
//     field: keyof typeof initialFormData,
//     value: string,
//   ) {
//     setFormData((previous) => ({
//       ...previous,
//       [field]: value,
//     }));
//   }

//   async function handleSubmit(
//     event: FormEvent<HTMLFormElement>,
//   ) {
//     event.preventDefault();

//     if (submitting) {
//       return;
//     }

//     setSubmitting(true);
//     setSubmitError(null);
//     setSubmitSuccess(false);

//     try {
//       console.log('========== FORM DATA ==========');
//       console.log(
//         JSON.stringify(formData, null, 2),
//       );
//       console.log('================================');

//       const response =
//         await submitCxoNetworkApplication({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           title: formData.title,
//           designation: formData.designation,
//           officialEmail: formData.officialEmail,
//           telephone: formData.telephone,
//           mobile: formData.mobile,
//           linkedin: formData.linkedin,
//           companyName: formData.companyName,
//           companyAddress: formData.companyAddress,
//           city: formData.city,
//           state: formData.state,
//           postalCode: formData.postalCode,
//           country: formData.country,
//           companyCategory:
//             formData.companyCategory,
//           businessVertical:
//             formData.businessVertical,
//         });

//       console.log(
//         'CXO NETWORK SUCCESS:',
//         response,
//       );

//       setSubmitSuccess(true);

//       setFormData(initialFormData);
//     } catch (error: unknown) {
//       console.error(
//         'CXO NETWORK SUBMIT ERROR:',
//         error,
//       );

//       setSubmitError(
//         error instanceof Error
//           ? error.message
//           : 'Unable to submit your application. Please try again.',
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <main className="cxo-join-page">
//       {/* =====================================================
//           HERO
//       ===================================================== */}

//       <section className="cxo-join-hero">
//         <div className="cxo-join-container">
//           <p className="cxo-join-breadcrumb">
//             Join Us
//           </p>

//           <h1>CXO Connect</h1>
//         </div>
//       </section>

//       {/* =====================================================
//           CONTENT
//       ===================================================== */}

//       <section className="cxo-join-section">
//         <div className="cxo-join-container cxo-join-grid">
//           {/* =================================================
//               LEFT CONTENT
//           ================================================= */}

//           <div className="cxo-join-content">
//             <span className="cxo-join-label">
//               CXO Hub Network
//             </span>

//             <h2>Dear CXO,</h2>

//             <p>
//               We invite <strong>YOU</strong> to join our
//               network. I look forward to forging a
//               mutually beneficial and collaborative
//               partnership.
//             </p>

//             <p>
//               Thank you for entrusting us with the
//               opportunity to contribute to your success.
//               Together, we will shape a future where
//               technology empowers and connects us all.
//             </p>

//             <div className="cxo-join-signature">
//               <p>Regards,</p>
//               <h3>Anoop Mathur</h3>
//             </div>

//             <div className="cxo-eligible-box">
//               <h3>
//                 CXO Titles Eligible to Join the Network:
//               </h3>

//               <ul>
//                 {eligibleTitles.map((title) => (
//                   <li key={title}>{title}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* =================================================
//               FORM
//           ================================================= */}

//           <form
//             className="cxo-join-form"
//             onSubmit={handleSubmit}
//           >
//             <h2>Join the Network</h2>

//             {submitSuccess && (
//               <div className="success-popup" role="alert">
//                 <div className="success-popup-icon">✓</div>

//                 <div className="success-popup-content">
//                   <strong>Success!</strong>
//                   <p>Your application has been submitted successfully.</p>
//                 </div>

//                 <button
//                   type="button"
//                   className="success-popup-close"
//                   onClick={() => setSubmitSuccess(false)}
//                   aria-label="Close success message"
//                 >
//                   ×
//                 </button>
//               </div>
//             )}

//             {submitError && (
//               <p className="form-error">
//                 {submitError}
//               </p>
//             )}

//             {/* First Name / Last Name */}

//             <div className="cxo-form-row">
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 required
//                 value={formData.firstName}
//                 onChange={(event) =>
//                   handleChange(
//                     'firstName',
//                     event.target.value.replace(
//                       /[^A-Za-z\s]/g,
//                       '',
//                     ),
//                   )
//                 }
//               />

//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 required
//                 value={formData.lastName}
//                 onChange={(event) =>
//                   handleChange(
//                     'lastName',
//                     event.target.value.replace(
//                       /[^A-Za-z\s]/g,
//                       '',
//                     ),
//                   )
//                 }
//               />
//             </div>

//             {/* Title / Designation */}

//             <div className="cxo-form-row">
//               <input
//                 type="text"
//                 placeholder="Title"
//                 required
//                 value={formData.title}
//                 onChange={(event) =>
//                   handleChange(
//                     'title',
//                     event.target.value.replace(
//                       /[^A-Za-z\s.]/g,
//                       '',
//                     ),
//                   )
//                 }
//               />

//               <input
//                 type="text"
//                 placeholder="Current Designation"
//                 required
//                 value={formData.designation}
//                 onChange={(event) =>
//                   handleChange(
//                     'designation',
//                     event.target.value,
//                   )
//                 }
//               />
//             </div>

//             {/* Email / Telephone */}

//             <div className="cxo-form-row">
//               <input
//                 type="email"
//                 placeholder="Email (Official)"
//                 required
//                 value={formData.officialEmail}
//                 onChange={(event) =>
//                   handleChange(
//                     'officialEmail',
//                     event.target.value,
//                   )
//                 }
//               />

//               <input
//                 type="tel"
//                 placeholder="Telephone No"
//                 required
//                 maxLength={15}
//                 value={formData.telephone}
//                 onChange={(event) =>
//                   handleChange(
//                     'telephone',
//                     event.target.value.replace(
//                       /[^0-9+]/g,
//                       '',
//                     ),
//                   )
//                 }
//               />
//             </div>

//             {/* Mobile / LinkedIn */}

//             <div className="cxo-form-row">
//               <input
//                 type="tel"
//                 placeholder="CIO Mobile Phone"
//                 required
//                 maxLength={15}
//                 value={formData.mobile}
//                 onChange={(event) =>
//                   handleChange(
//                     'mobile',
//                     event.target.value.replace(
//                       /[^0-9+]/g,
//                       '',
//                     ),
//                   )
//                 }
//               />

//               <input
//                 type="url"
//                 placeholder="LinkedIn Link"
//                 required
//                 value={formData.linkedin}
//                 onChange={(event) =>
//                   handleChange(
//                     'linkedin',
//                     event.target.value,
//                   )
//                 }
//               />
//             </div>

//             {/* Company Name / Address */}

//             <div className="cxo-form-row">
//               <input
//                 type="text"
//                 placeholder="Company Name"
//                 required
//                 value={formData.companyName}
//                 onChange={(event) =>
//                   handleChange(
//                     'companyName',
//                     event.target.value,
//                   )
//                 }
//               />

//               <textarea
//                 className="company-address-field"
//                 placeholder="Company Address"
//                 rows={1}
//                 required
//                 value={formData.companyAddress}
//                 onChange={(event) =>
//                   handleChange(
//                     'companyAddress',
//                     event.target.value,
//                   )
//                 }
//               />
//             </div>

//             {/* City / State */}

//             <div className="cxo-form-row">
//               <input
//                 type="text"
//                 placeholder="City"
//                 required
//                 value={formData.city}
//                 onChange={(event) =>
//                   handleChange(
//                     'city',
//                     event.target.value.replace(
//                       /[^A-Za-z\s]/g,
//                       '',
//                     ),
//                   )
//                 }
//               />

//               <input
//                 type="text"
//                 placeholder="State"
//                 required
//                 value={formData.state}
//                 onChange={(event) =>
//                   handleChange(
//                     'state',
//                     event.target.value.replace(
//                       /[^A-Za-z\s]/g,
//                       '',
//                     ),
//                   )
//                 }
//               />
//             </div>

//             {/* Postal / Country */}

//             <div className="cxo-form-row">
//               <input
//                 type="text"
//                 placeholder="Postal Code / ZIP"
//                 required
//                 maxLength={10}
//                 value={formData.postalCode}
//                 onChange={(event) =>
//                   handleChange(
//                     'postalCode',
//                     event.target.value.replace(
//                       /[^0-9]/g,
//                       '',
//                     ),
//                   )
//                 }
//               />

//               <input
//                 type="text"
//                 placeholder="Country"
//                 required
//                 value={formData.country}
//                 onChange={(event) =>
//                   handleChange(
//                     'country',
//                     event.target.value.replace(
//                       /[^A-Za-z\s]/g,
//                       '',
//                     ),
//                   )
//                 }
//               />
//             </div>

//             {/* Category / Business Vertical */}

//             <div className="cxo-form-row">
//               <select
//                 required
//                 value={formData.companyCategory}
//                 onChange={(event) =>
//                   handleChange(
//                     'companyCategory',
//                     event.target.value,
//                   )
//                 }
//               >
//                 <option value="">
//                   Company Category
//                 </option>

//                 <option value="Enterprise">
//                   Enterprise
//                 </option>

//                 <option value="Startup">
//                   Startup
//                 </option>

//                 <option value="Government">
//                   Government
//                 </option>

//                 <option value="Education">
//                   Education
//                 </option>

//                 <option value="Other">
//                   Other
//                 </option>
//               </select>

//               <input
//                 type="text"
//                 placeholder="Business Vertical"
//                 required
//                 value={formData.businessVertical}
//                 onChange={(event) =>
//                   handleChange(
//                     'businessVertical',
//                     event.target.value,
//                   )
//                 }
//               />
//             </div>

//             {/* Submit */}

//             <button
//               type="submit"
//               disabled={submitting}
//             >
//               {submitting
//                 ? 'Submitting...'
//                 : 'Submit'}
//             </button>
//           </form>
//         </div>
//       </section>
//     </main>
//   );
// }

'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { submitCxoNetworkApplication } from '@/services/attendees.service';

const eligibleTitles = [
  'CIOs – Chief Information Officers',
  'CTOs – Chief Technology Officers',
  'CDOs – Chief Digital Officers',
  'CDOs – Chief Data Officers',
  'CISOs – Chief Information Security Officers',
  'ITDMs – Senior Most Information Technology Decision Makers',
];

const initialFormData = {
  firstName: '',
  lastName: '',
  title: '',
  designation: '',
  officialEmail: '',
  telephone: '',
  mobile: '',
  linkedin: '',
  companyName: '',
  companyAddress: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  companyCategory: '',
  businessVertical: '',
};

export default function CxoConnectPage() {
  const [formData, setFormData] = useState(initialFormData);

  const [submitting, setSubmitting] = useState(false);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Automatically hide success popup after 3 seconds
  useEffect(() => {
    if (!submitSuccess) {
      return;
    }

    const timer = setTimeout(() => {
      setSubmitSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [submitSuccess]);

  function handleChange(field: keyof typeof initialFormData, value: string) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // console.log('========== FORM DATA ==========');
      // console.log(JSON.stringify(formData, null, 2));
      // console.log('================================');

      await submitCxoNetworkApplication({
        firstName: formData.firstName,
        lastName: formData.lastName,
        title: formData.title,
        designation: formData.designation,
        officialEmail: formData.officialEmail,
        telephone: formData.telephone,
        mobile: formData.mobile,
        linkedin: formData.linkedin,
        companyName: formData.companyName,
        companyAddress: formData.companyAddress,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
        companyCategory: formData.companyCategory,
        businessVertical: formData.businessVertical,
      });

      // Show success popup
      setSubmitSuccess(true);

      // Reset form
      setFormData(initialFormData);
    } catch (error: unknown) {
      // console.error('CXO NETWORK SUBMIT ERROR:', error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Unable to submit your application. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="cxo-join-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="cxo-join-hero">
        <div className="cxo-join-container">
          <p className="cxo-join-breadcrumb">Join Us</p>

          <h1>CXO Connect</h1>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="cxo-join-section">
        <div className="cxo-join-container cxo-join-grid">
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="cxo-join-content">
            <span className="cxo-join-label">CXO Hub Network</span>

            <h2>Dear CXO,</h2>

            <p>
              We invite <strong>YOU</strong> to join our network. I look forward to forging a
              mutually beneficial and collaborative partnership.
            </p>

            <p>
              Thank you for entrusting us with the opportunity to contribute to your success.
              Together, we will shape a future where technology empowers and connects us all.
            </p>

            <div className="cxo-join-signature">
              <p>Regards,</p>
              <h3>Anoop Mathur</h3>
            </div>

            <div className="cxo-eligible-box">
              <h3>CXO Titles Eligible to Join the Network:</h3>

              <ul>
                {eligibleTitles.map((title) => (
                  <li key={title}>{title}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form className="cxo-join-form" onSubmit={handleSubmit}>
            <h2>Join the Network</h2>

            {/* SUCCESS POPUP */}
            {submitSuccess && (
              <div className="success-popup" role="alert">
                <div className="success-popup-icon">✓</div>

                <div className="success-popup-content">
                  <strong>Success!</strong>

                  <p>Your application has been submitted successfully.</p>
                </div>

                <button
                  type="button"
                  className="success-popup-close"
                  onClick={() => setSubmitSuccess(false)}
                  aria-label="Close success message"
                >
                  ×
                </button>
              </div>
            )}

            {/* ERROR MESSAGE */}
            {submitError && <p className="form-error">{submitError}</p>}

            {/* First Name / Last Name */}

            <div className="cxo-form-row">
              <input
                type="text"
                placeholder="First Name"
                required
                value={formData.firstName}
                onChange={(event) =>
                  handleChange('firstName', event.target.value.replace(/[^A-Za-z\s]/g, ''))
                }
              />

              <input
                type="text"
                placeholder="Last Name"
                required
                value={formData.lastName}
                onChange={(event) =>
                  handleChange('lastName', event.target.value.replace(/[^A-Za-z\s]/g, ''))
                }
              />
            </div>

            {/* Title / Designation */}

            <div className="cxo-form-row">
              <input
                type="text"
                placeholder="Title"
                required
                value={formData.title}
                onChange={(event) =>
                  handleChange('title', event.target.value.replace(/[^A-Za-z\s.]/g, ''))
                }
              />

              <input
                type="text"
                placeholder="Current Designation"
                required
                value={formData.designation}
                onChange={(event) => handleChange('designation', event.target.value)}
              />
            </div>

            {/* Email / Telephone */}

            <div className="cxo-form-row">
              <input
                type="email"
                placeholder="Email (Official)"
                required
                value={formData.officialEmail}
                onChange={(event) => handleChange('officialEmail', event.target.value)}
              />

              <input
                type="tel"
                placeholder="Telephone No"
                required
                maxLength={15}
                value={formData.telephone}
                onChange={(event) =>
                  handleChange('telephone', event.target.value.replace(/[^0-9+]/g, ''))
                }
              />
            </div>

            {/* Mobile / LinkedIn */}

            <div className="cxo-form-row">
              <input
                type="tel"
                placeholder="CIO Mobile Phone"
                required
                maxLength={15}
                value={formData.mobile}
                onChange={(event) =>
                  handleChange('mobile', event.target.value.replace(/[^0-9+]/g, ''))
                }
              />

              <input
                type="url"
                placeholder="LinkedIn Link"
                required
                value={formData.linkedin}
                onChange={(event) => handleChange('linkedin', event.target.value)}
              />
            </div>

            {/* Company Name / Address */}

            <div className="cxo-form-row">
              <input
                type="text"
                placeholder="Company Name"
                required
                value={formData.companyName}
                onChange={(event) => handleChange('companyName', event.target.value)}
              />

              <textarea
                className="company-address-field"
                placeholder="Company Address"
                rows={1}
                required
                value={formData.companyAddress}
                onChange={(event) => handleChange('companyAddress', event.target.value)}
              />
            </div>

            {/* City / State */}

            <div className="cxo-form-row">
              <input
                type="text"
                placeholder="City"
                required
                value={formData.city}
                onChange={(event) =>
                  handleChange('city', event.target.value.replace(/[^A-Za-z\s]/g, ''))
                }
              />

              <input
                type="text"
                placeholder="State"
                required
                value={formData.state}
                onChange={(event) =>
                  handleChange('state', event.target.value.replace(/[^A-Za-z\s]/g, ''))
                }
              />
            </div>

            {/* Postal / Country */}

            <div className="cxo-form-row">
              <input
                type="text"
                placeholder="Postal Code / ZIP"
                required
                maxLength={10}
                value={formData.postalCode}
                onChange={(event) =>
                  handleChange('postalCode', event.target.value.replace(/[^0-9]/g, ''))
                }
              />

              <input
                type="text"
                placeholder="Country"
                required
                value={formData.country}
                onChange={(event) =>
                  handleChange('country', event.target.value.replace(/[^A-Za-z\s]/g, ''))
                }
              />
            </div>

            {/* Category / Business Vertical */}

            <div className="cxo-form-row">
              <select
                required
                value={formData.companyCategory}
                onChange={(event) => handleChange('companyCategory', event.target.value)}
              >
                <option value="">Company Category</option>

                <option value="Enterprise">Enterprise</option>

                <option value="Startup">Startup</option>

                <option value="Government">Government</option>

                <option value="Education">Education</option>

                <option value="Other">Other</option>
              </select>

              <input
                type="text"
                placeholder="Business Vertical"
                required
                value={formData.businessVertical}
                onChange={(event) => handleChange('businessVertical', event.target.value)}
              />
            </div>

            {/* Submit */}

            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
