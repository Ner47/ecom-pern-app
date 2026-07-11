import { useDispatch, useSelector } from "react-redux";
import "./AccountPage.css";
import { selectUserProfile, fetchUserProfile } from "@/features/user";
import { useEffect } from "react";
import { iconAccountAvatar } from "../../shared/assets";
import { Link } from "react-router-dom";

export function AccountPage() {
  const dispatch = useDispatch();
  const profile = useSelector(selectUserProfile);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (!profile) return <main className="profile">Loading page...</main>;

  return (
    <main className="profile">
      <section className="profile-card">
        <img
          className="profile-card__avatar"
          src={iconAccountAvatar}
          alt="icon account avatar"
        />
        <div className="profile-card__info">
          <p>
            Name: {profile.firstname} {profile.lastname}
          </p>
          <p>Email: {profile.email}</p>
          <Link to="/orders">My Orders</Link>
          <Link to="/cart">My Cart</Link>
        </div>
      </section>
    </main>
  );
}
