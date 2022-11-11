import Router, { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import RegisterForm from "../../components/meetups/RegisterForm";

function RegisterPage() {
  const router = useRouter();

  async function registerHandler(enteredRegisterData) {
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(enteredRegisterData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>註冊</title>
        <meta
          name="description"
          content="Register for the React Meetups!"
        />
      </Head>
      <RegisterForm onRegister={registerHandler} />
    </Fragment>
  );
}

export async function getStaticProps() {
    // fetch dada from an API
    
    return {
      props: {
        meetups: meetups.map((meetup) => ({
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
        })),
      },
      revalidate: 10, //10秒就重抓資料一次
    };
  }

export default RegisterPage;