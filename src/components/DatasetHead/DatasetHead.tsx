import { readCSV } from 'danfojs'
import { useEffect } from 'react'
import { DatasetHeadProps } from './types'

const DatasetHead = ({
  fileName,
  rowsToShow = 5,
  dropColumns,
}: DatasetHeadProps) => {
  useEffect(() => {
    const loadData = async (fileName: string) => {
      const df = await readCSV(`${window.location.origin}/${fileName}`)
      dropColumns && df.drop({ columns: dropColumns, inplace: true })
      df.head(rowsToShow).plot('table').table()
    }

    void loadData(fileName)
  }, [fileName, rowsToShow, dropColumns])

  return <div id="table" className="mb-8" />
}

export default DatasetHead
