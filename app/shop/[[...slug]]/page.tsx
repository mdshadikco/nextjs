interface Props {
    params: { slug?: string[] }
  }
  
  export default function Shop({ params }: Props) {
    const { slug } = params;
    
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