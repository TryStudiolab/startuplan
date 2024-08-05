const { useState } = React;

function StartupPlanForm() {
    const [formData, setFormData] = useState({
        companyName: '',
        mission: '',
        productDescription: '',
        targetMarket: '',
        competitiveAdvantage: '',
        financialProjections: '',
    });

    const [showPreview, setShowPreview] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('創業計畫書內容:', formData);
        alert('計畫書已保存！');
    };

    const generatePDF = async () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const Unicode = await window.UnicodeModule;
        await Unicode(doc);

        doc.setFont('NotoSansTC', 'normal');
        
        doc.setFontSize(18);
        doc.text('創業計畫書', 105, 20, { align: 'center' });
        
        doc.setFontSize(12);
        const sections = [
            { title: '一、公司名稱', content: formData.companyName },
            { title: '二、公司使命', content: formData.mission },
            { title: '三、產品/服務描述', content: formData.productDescription },
            { title: '四、目標市場', content: formData.targetMarket },
            { title: '五、競爭優勢', content: formData.competitiveAdvantage },
            { title: '六、財務預測', content: formData.financialProjections }
        ];

        let yPosition = 40;
        sections.forEach(section => {
            doc.setFontSize(12);
            doc.text(section.title, 20, yPosition);
            yPosition += 10;
            
            doc.setFontSize(10);
            const contentLines = doc.splitTextToSize(section.content, 170);
            doc.text(contentLines, 20, yPosition);
            yPosition += contentLines.length * 7 + 10;

            if (yPosition > 280) {
                doc.addPage();
                yPosition = 20;
            }
        });
        
        doc.save('startup_plan.pdf');
    };

    return (
        <div className="container">
            <h1>創業計畫書生成器</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="companyName">一、公司名稱：</label>
                <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                />
                
                <label htmlFor="mission">二、公司使命：</label>
                <textarea
                    id="mission"
                    name="mission"
                    value={formData.mission}
                    onChange={handleChange}
                    required
                />
                
                <label htmlFor="productDescription">三、產品/服務描述：</label>
                <textarea
                    id="productDescription"
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleChange}
                    required
                />
                
                <label htmlFor="targetMarket">四、目標市場：</label>
                <textarea
                    id="targetMarket"
                    name="targetMarket"
                    value={formData.targetMarket}
                    onChange={handleChange}
                    required
                />
                
                <label htmlFor="competitiveAdvantage">五、競爭優勢：</label>
                <textarea
                    id="competitiveAdvantage"
                    name="competitiveAdvantage"
                    value={formData.competitiveAdvantage}
                    onChange={handleChange}
                    required
                />
                
                <label htmlFor="financialProjections">六、財務預測：</label>
                <textarea
                    id="financialProjections"
                    name="financialProjections"
                    value={formData.financialProjections}
                    onChange={handleChange}
                    required
                />
                
                <button type="submit">保存計畫書</button>
                <button type="button" onClick={() => setShowPreview(!showPreview)}>
                    {showPreview ? '隱藏預覽' : '顯示預覽'}
                </button>
                <button type="button" onClick={generatePDF}>匯出 PDF</button>
            </form>

            {showPreview && (
                <div id="preview">
                    <h2>預覽</h2>
                    <h3>一、公司名稱：{formData.companyName}</h3>
                    <p><strong>二、公司使命：</strong> {formData.mission}</p>
                    <p><strong>三、產品/服務描述：</strong> {formData.productDescription}</p>
                    <p><strong>四、目標市場：</strong> {formData.targetMarket}</p>
                    <p><strong>五、競爭優勢：</strong> {formData.competitiveAdvantage}</p>
                    <p><strong>六、財務預測：</strong> {formData.financialProjections}</p>
                </div>
            )}
        </div>
    );
}

ReactDOM.render(<StartupPlanForm />, document.getElementById('root'));
