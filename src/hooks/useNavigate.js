import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navigate(url) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(url);
  }, [navigate, url]);
}
