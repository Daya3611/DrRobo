import { NextResponse } from 'next/server';

export async function GET(request: { url: string | URL; }) {
  const { searchParams } = new URL(request.url);
  const drugName = searchParams.get('name');

  if (!drugName) {
    return NextResponse.json({ error: 'Drug name is required.' }, { status: 400 });
  }

  const url = `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${drugName}`;

  try {
    const apiResponse = await fetch(url);
    const data = await apiResponse.json();

    if (!data.drugGroup.conceptGroup) {
      return NextResponse.json({ error: 'No information found for this medicine.' }, { status: 404 });
    }

    return NextResponse.json(data.drugGroup.conceptGroup);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
