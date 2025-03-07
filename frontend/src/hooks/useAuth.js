import { useQuery } from "@tanstack/react-query";

const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: () => {
      const token = localStorage.getItem("token");
      return !!token;
    },
  });
};

export default useAuth;
