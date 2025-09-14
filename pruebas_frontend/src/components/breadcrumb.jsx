import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { useBreadcrumb } from "../context/breadcrumb_context";

const BreadcrumbNav = () => {
  const { breadcrumbItems } = useBreadcrumb();

  const items = breadcrumbItems.map((item, index) => ({
    key: item.path,
    title: <Link to={item.path}>{item.title}</Link>,
  }));

  return <Breadcrumb items={items} />;
};

export default BreadcrumbNav;

