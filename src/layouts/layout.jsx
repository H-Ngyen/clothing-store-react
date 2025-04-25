import HeaderClient from "../components/HeaderClient";

export default function Layout({ children }) {
  return (
    <div className="tw-flex tw-flex-col tw-min-h-screen tw-bg-[#F1F0EC]">
      <HeaderClient />
      <div className="tw-container tw-mx-auto tw-flex-1 tw-py-10">{children}</div>
    </div>
  )
};