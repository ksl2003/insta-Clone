'use client';
import {Post} from "@prisma/client";
import Link from "next/link";
import Masonry from 'react-masonry-css';

export default function PostsGrid({posts}:{posts:Post[]}) {
  return (
    <div className="w-full">
      <Masonry
        breakpointCols={{
          default: 3,
          1024: 3,
          768: 2,
          640: 1
        }}
        className="flex -ml-2"
        columnClassName="pl-2">
        {posts.map(post => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`} 
            className="block mb-2 group hover-lift"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted image-hover">
              <img
                className="w-full h-full object-cover transition-transform duration-300"
                src={post.image} 
                alt={post.description || "Post image"}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          </Link>
        ))}
      </Masonry>
    </div>
  );
}