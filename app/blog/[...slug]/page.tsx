interface Props {
    params: Promise<{ slug: string[] }>;
  }
  
  export default async function BlogPost({ params }: Props) {
    const { slug } = await params; 
    
    return (
      <div>
        <h1>Blog Post</h1>
        <p>Slug: {slug.join('/')}</p>
      </div>
    );
  }