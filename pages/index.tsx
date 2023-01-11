import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Content.module.css";

type propsType = {
  data: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: String;
    image: string;
    rating: { rate: number; count: number };
  }[];
};

export default function Home(props: propsType) {
  console.log(props.data);
  const prodData = props.data;
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.storeHeading}>Store</h1>
        {prodData.map((prod) => {
          return (
            <div className={styles.content}>
              <Image
                src={prod.image}
                alt="this is alternative"
                width="200"
                height="200"
              />
              <h4>{prod.title}</h4>
              <p>Price - {prod.price}</p>
              <p>category - {prod.category}</p>
              <button>Buy</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getStaticProps(context: any) {
  const response = await fetch("http://localhost:4000/products");
  const data = await response.json();

  return {
    props: { data }, // will be passed to the page component as props
    revalidate: 10,
  };
}
