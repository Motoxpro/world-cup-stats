const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  // Fetch data from external API
  const data = await fetchData();
  if (data) {
    // Insert data into Supabase database
    const result = await insertDataIntoSupabase(data);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data fetched and stored successfully', details: result })
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch or insert data' })
    };
  }
};

async function fetchData() {
  const url = 'https://prod.chronorace.be/api/results/generic/uci/20240503_mtb/dh?key=3';
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log(`Failed to fetch data: HTTP ${response.status}`);
      return null;
    }
  } catch (error) {
    console.log(`Failed to fetch data: ${error.message}`);
    return null;
  }
}

async function insertDataIntoSupabase(data) {
  const { data: insertedData, error } = await supabase
    .from('your_table')
    .insert([
      { column_name: data.someField, other_column: data.otherField }
    ]);
  if (error) throw new Error(`Error inserting data: ${error.message}`);
  return insertedData;
}
