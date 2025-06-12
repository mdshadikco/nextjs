interface Props {
    params: Promise<{ slug: string[] }>;
  }
  
  export default async function Shop({ params }: Props) {
    const { slug } = await params;
    
    if (!slug) {
      return <div>Shop Home Page</div>;
    }
    
    return (
      <div>
        <h1>Shop Category</h1>
        <p>Path: {slug.join(' / ')}</p>
      </div>
    );
  }