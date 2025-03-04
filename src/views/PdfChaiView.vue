<template>
  <div>
    <input type="file" @change="handleFileUpload" accept="application/pdf" />
    <input v-model="startPage" type="number" min="1" placeholder="开始页码" />
    <input v-model="endPage" type="number" min="1" placeholder="结束页码" />
    <button @click="splitPDF">拆分 PDF</button>
  </div>
</template>

<script>
  import { PDFDocument } from 'pdf-lib'

  export default {
    data() {
      return {
        pdfFile: null,
        startPage: 1,
        endPage: 1,
      }
    },
    methods: {
      handleFileUpload(event) {
        this.pdfFile = event.target.files[0]
      },
      async splitPDF() {
        if (!this.pdfFile) {
          alert('请先上传 PDF 文件')
          return
        }
        if (!this.startPage || !this.endPage || this.startPage > this.endPage) {
          alert('请输入正确的起始页和结束页')
          return
        }

        const reader = new FileReader()
        reader.readAsArrayBuffer(this.pdfFile)

        reader.onload = async event => {
          try {
            const pdfDoc = await PDFDocument.load(event.target.result)
            const totalPages = pdfDoc.getPageCount()

            if (this.startPage < 1 || this.endPage > totalPages) {
              alert(`PDF 只有 ${totalPages} 页，无法拆分`)
              return
            }

            // 创建一个新的 PDF 文档
            const newPdf = await PDFDocument.create()

            // 复制指定页码范围的页面
            for (let i = this.startPage - 1; i < this.endPage; i++) {
              const [copiedPage] = await newPdf.copyPages(pdfDoc, [i])
              newPdf.addPage(copiedPage)
            }

            // 生成新的 PDF 文件
            const newPdfBytes = await newPdf.save()
            const blob = new Blob([newPdfBytes], { type: 'application/pdf' })

            // 触发下载
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = `split_pages_${this.startPage}-${this.endPage}.pdf`
            link.click()
          } catch (error) {
            console.error('拆分 PDF 失败:', error)
            alert('拆分失败，请检查文件格式')
          }
        }
      },
    },
  }
</script>
