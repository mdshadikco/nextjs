interface Props {
    params: { slug: string[] }
  }
  
  export default function BlogPost({ params }: Props) {
    const { slug } = params;
    
    return (
      <div>
        <h1>Blog Post</h1>
        <p>Slug segments: {slug.join(' / ')}</p>
      </div>
    );
  }