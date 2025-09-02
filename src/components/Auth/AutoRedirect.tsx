// // src/components/Auth/AutoRedirect.tsx
// import { useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";

// const REDIRECT_KEY = "redirectAfterLogin";

// const AutoRedirect = () => {
//   const { user, loading } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     // Don't run logic while auth is still loading
//     if (loading) return;

//     // If no user, start a 5 min timer
//     if (!user) {
//       timerRef.current = setTimeout(() => {
//         localStorage.setItem(REDIRECT_KEY, location.pathname + location.search);
//         navigate("/login");
//       }, 5 * 60 * 1000); // 5 minutes
//     } else {
//       // If user logs in, clear the timer
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//         timerRef.current = null;
//       }
//     }

//     // Cleanup timer on unmount or route change
//     return () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//         timerRef.current = null;
//       }
//     };
//   }, [user, loading, location, navigate]);

//   return null; // This component doesn't render anything
// };

// export default AutoRedirect;
