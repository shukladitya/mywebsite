"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
const Blogs = () => {
  const [posts, setPosts] = useState<
    {
      image: string;
      link: string;
      title: string;
      tags: string[];
    }[]
  >([]);
  const fetchBlogs = async () => {
    try {
      const response = await fetch("api", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Request-Method": "GET",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const { jsonData } = data;
        console.log(jsonData);
        setPosts(
          jsonData?.rss?.channel[0]?.item?.map((item: any) => {
            return {
              image: item["content:encoded"]
                ? item["content:encoded"][0]?.match(/src="([^"]+)"/)[1]
                : item?.description[0]?.match(/src="([^"]+)"/)[1],
              link: item.link[0],
              title: item.title[0],
              tags: item.category,
            };
          })
        );
      } else {
        console.error(
          "Error fetching blogs:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className={styles.scaffold}>
      <h1>Blog</h1>
      <div className={styles.blogs}>
        {posts.length &&
          posts.map((post) => (
            <Link key={post.link} href={post.link}>
              <div>
                <img src={post.image} alt={post.title} />
                <p>{post.title}</p>
                {post?.tags?.length && (
                  <div className={styles.tags}>
                    {post.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Blogs;
